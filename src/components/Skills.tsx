"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./Skills.module.css";

const skills = [
  "Python", "JavaScript", "TypeScript", "Java", "C#",
  "React", "Next.js", "Vue.js", "Node.js", "FastAPI",
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "Docker",
  "AWS", "Git", "Figma", "GraphQL", "Nginx",
];

function createTextTexture(text: string, isHovered: boolean = false) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  
  canvas.width = 256;
  canvas.height = 64;
  
  ctx.fillStyle = isHovered ? "#3b82f6" : "#ffffff";
  ctx.font = "bold 28px 'Geist', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    group: THREE.Group;
    sprites: THREE.Sprite[];
    animationId: number;
    mouse: THREE.Vector2;
    raycaster: THREE.Raycaster;
    hoveredSprite: THREE.Sprite | null;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all sprites
    const group = new THREE.Group();
    scene.add(group);

    // Create sprites on sphere surface
    const sprites: THREE.Sprite[] = [];
    const radius = 200;
    const phi_offset = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    skills.forEach((skill, i) => {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi_offset * i;

      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;
      const yPos = y * radius;

      const texture = createTextTexture(skill);
      const material = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true,
        opacity: 0.9,
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(x, yPos, z);
      sprite.scale.set(120, 30, 1);
      sprite.userData = { skill, originalScale: 120 };
      
      group.add(sprite);
      sprites.push(sprite);
    });

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let hoveredSprite: THREE.Sprite | null = null;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;
    };

    container.addEventListener("mousemove", onMouseMove);

    // Drag to rotate
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let autoRotateSpeed = 0.002;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onDrag = (event: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y,
      };

      targetRotationY += deltaMove.x * 0.005;
      targetRotationX += deltaMove.y * 0.005;

      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onDrag);

    // Animation
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      sceneRef.current!.animationId = animationId;

      // Auto rotation when not dragging
      if (!isDragging) {
        group.rotation.y += autoRotateSpeed;
      }

      // Apply drag rotation
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.1;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.1;
      targetRotationY *= 0.95;
      targetRotationX *= 0.95;

      // Raycaster for hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(sprites);

      // Reset previous hover
      if (hoveredSprite && (!intersects.length || intersects[0].object !== hoveredSprite)) {
        const skill = hoveredSprite.userData.skill;
        (hoveredSprite.material as THREE.SpriteMaterial).map = createTextTexture(skill, false);
        hoveredSprite.scale.x = hoveredSprite.userData.originalScale;
        hoveredSprite = null;
      }

      // Apply new hover
      if (intersects.length > 0) {
        const sprite = intersects[0].object as THREE.Sprite;
        if (sprite !== hoveredSprite) {
          hoveredSprite = sprite;
          const skill = sprite.userData.skill;
          (sprite.material as THREE.SpriteMaterial).map = createTextTexture(skill, true);
          sprite.scale.x = sprite.userData.originalScale * 1.3;
        }
      }

      // Make sprites face camera
      sprites.forEach((sprite) => {
        sprite.lookAt(camera.position);
      });

      renderer.render(scene, camera);
    };

    sceneRef.current = {
      scene,
      camera,
      renderer,
      group,
      sprites,
      animationId: 0,
      mouse,
      raycaster,
      hoveredSprite: null,
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onDrag);
      
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        renderer.dispose();
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Technologies</h2>
        <p className={styles.subtitle}>드래그하여 회전해보세요</p>
        <div ref={containerRef} className={styles.canvas} />
      </div>
    </section>
  );
}
