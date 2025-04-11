# Dangling Badge Effect

This implementation creates an interactive 3D dangling badge effect when users hover over specific elements in the navigation bar.

## Overview

The dangling badge effect uses React Three Fiber, a React renderer for Three.js, to create a physics-based 3D badge that appears to hang from a lanyard. The badge drops and sways realistically when a user hovers over designated navigation items.

## Components

### 1. DanglingBadge.jsx

The main component that renders the 3D badge with physics. It uses:
- **React Three Fiber**: For 3D rendering
- **@react-three/rapier**: For physics simulation (joints, colliders)
- **meshline**: For the lanyard rope effect

### 2. NavBadgeWrapper.jsx

A wrapper component that:
- Manages the hover state of navigation items
- Positions the badge relative to the hovered item
- Shows/hides the badge based on hover state

## Integration

The effect is integrated into the Navbar component using Next.js dynamic imports to avoid SSR issues with Three.js.

## Physics Implementation

The physics system uses:
- **RigidBody**: For physical objects that react to forces
- **RopeJoint**: To connect the lanyard segments with constraints
- **SphericalJoint**: To attach the badge to the lanyard
- **Colliders**: To define the physics shape of objects

## Animation

The animation is driven by the physics engine, which creates natural movement:
- The badge swings with inertia
- The lanyard bends realistically
- Subtle dampening prevents excessive motion

## Customization

You can customize:
- Badge appearance by changing the texture image
- Physics properties (gravity, damping)
- Animation speed and behavior
- Badge size and appearance

## Usage

To use this effect elsewhere, wrap your component with `NavBadgeWrapper` and ensure the image path is correct:

```jsx
<NavBadgeWrapper badgeImage="/path/to/image.jpg">
  <YourComponent />
</NavBadgeWrapper>
```

## Dependencies

- three
- @react-three/fiber
- @react-three/drei
- @react-three/rapier
- meshline

## Inspired by

This implementation was inspired by the Vercel Ship 2024 interactive badge effect. 