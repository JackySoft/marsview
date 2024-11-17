import React, { useState, useEffect } from 'react'

interface RandomAvatarProps {
  size?: number
  className?: string
  seed?: string
}

const avatars = [
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="50" cy="50" r="50" fill="#F0F4F8" />
      <circle cx="50" cy="50" r="45" fill="#E1E8ED" />
      <circle cx="50" cy="50" r="40" fill="#D2DDE6" />
      <circle cx="35" cy="40" r="8" fill="#4A5568" />
      <circle cx="65" cy="40" r="8" fill="#4A5568" />
      <path d="M35 65 Q50 75 65 65" stroke="#4A5568" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M25 30 Q35 20 50 25 Q65 30 75 20" stroke="#718096" strokeWidth="2" fill="none" />
    </svg>
  ),
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="50" cy="50" r="50" fill="#FEEBC8" />
      <circle cx="50" cy="50" r="45" fill="#FED7AA" />
      <circle cx="50" cy="50" r="40" fill="#FED7AA" />
      <circle cx="35" cy="40" r="8" fill="#7B341E" />
      <circle cx="65" cy="40" r="8" fill="#7B341E" />
      <path d="M35 60 Q50 70 65 60" stroke="#7B341E" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M20 25 Q35 40 50 25 Q65 40 80 25" fill="#FEEBC8" />
    </svg>
  ),
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="50" cy="50" r="50" fill="#E6FFFA" />
      <circle cx="50" cy="50" r="45" fill="#B2F5EA" />
      <circle cx="50" cy="50" r="40" fill="#81E6D9" />
      <circle cx="35" cy="40" r="8" fill="#234E52" />
      <circle cx="65" cy="40" r="8" fill="#234E52" />
      <path d="M35 65 Q50 60 65 65" stroke="#234E52" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M25 20 L75 20" stroke="#319795" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="50" cy="50" r="50" fill="#FFF5F5" />
      <circle cx="50" cy="50" r="45" fill="#FED7D7" />
      <circle cx="50" cy="50" r="40" fill="#FEB2B2" />
      <circle cx="35" cy="40" r="8" fill="#742A2A" />
      <circle cx="65" cy="40" r="8" fill="#742A2A" />
      <path d="M35 65 Q50 75 65 65" stroke="#742A2A" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M20 30 Q35 20 50 30 Q65 20 80 30" fill="#FFF5F5" />
    </svg>
  ),
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="50" cy="50" r="50" fill="#EBF4FF" />
      <circle cx="50" cy="50" r="45" fill="#C3DAFE" />
      <circle cx="50" cy="50" r="40" fill="#A3BFFA" />
      <circle cx="35" cy="40" r="8" fill="#3C366B" />
      <circle cx="65" cy="40" r="8" fill="#3C366B" />
      <path d="M35 65 Q50 70 65 65" stroke="#3C366B" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M25 25 L75 25" stroke="#667EEA" strokeWidth="4" strokeLinecap="round" />
      <path d="M25 30 L75 30" stroke="#667EEA" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
]

export default function RandomAvatar({ size = 40, className = '', seed }: RandomAvatarProps) {
  const [avatarIndex, setAvatarIndex] = useState(0)

  useEffect(() => {
    const index = seed
      ? Math.abs(seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % avatars.length
      : Math.floor(Math.random() * avatars.length)
    setAvatarIndex(index)
  }, [seed])

  const SelectedAvatar = avatars[avatarIndex]

  return <SelectedAvatar width={size} height={size} className={className} />
}
