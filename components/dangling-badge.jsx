"use client"

import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

export default function DanglingBadge({ isHovered, badgeImage = '/images/photo_design.png' }) {
  return (
    <div className={`fixed top-20 z-40 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ width: '200px', height: '300px' }}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={25} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Physics interpolate gravity={[0, -30, 0]} timeStep={1 / 60}>
          <Badge badgeImage={badgeImage} />
        </Physics>
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

function Badge({ badgeImage }) {
  const band = useRef()
  const fixed = useRef()
  const j1 = useRef()
  const j2 = useRef()
  const j3 = useRef()
  const card = useRef()
  
  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const { width, height } = useThree((state) => state.size)
  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(), 
    new THREE.Vector3(), 
    new THREE.Vector3(), 
    new THREE.Vector3()
  ]))

  // Set up joints between the rigid bodies
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

  useFrame((state, delta) => {
    if (fixed.current) {
      // Wake up the physics bodies for animation
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp())
      
      // Calculate catmull curve for the lanyard
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.translation())
      curve.points[2].copy(j1.current.translation())
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(32))
      
      // Add a gentle swaying motion
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ 
        x: ang.x, 
        y: ang.y - rot.y * 0.25, 
        z: ang.z 
      })
    }
  })

  return (
    <>
      <group position={[0, 3, 0]}>
        <RigidBody ref={fixed} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} angularDamping={2} linearDamping={2}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.6, 2.25, 0.1]} />
            <meshStandardMaterial>
              <meshStandardMaterial color="#f8f4e3" />
            </meshStandardMaterial>
          </mesh>
          <mesh position={[0, 0, 0.051]} castShadow receiveShadow>
            <planeGeometry args={[1.5, 2.15]} />
            <meshStandardMaterial map={new THREE.TextureLoader().load(badgeImage)} />
          </mesh>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial 
          transparent 
          opacity={0.75} 
          color="#513e30" 
          lineWidth={0.1}
          resolution={[width, height]} 
        />
      </mesh>
    </>
  )
} 