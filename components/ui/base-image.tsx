"use client"

import Image, { ImageProps } from "next/image"
import { getImagePath } from "@/lib/utils"

interface BaseImageProps extends Omit<ImageProps, 'src'> {
  src: string;
}

export default function BaseImage({ src, ...props }: BaseImageProps) {
  // Only transform the src if it's a local image (starts with /)
  const imageSrc = src.startsWith('/') ? getImagePath(src) : src;
  
  return <Image src={imageSrc} {...props} />;
} 