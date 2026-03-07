import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export interface UserAvatarProps {
	src?: string
	name?: string
	size?: 'sm' | 'default' | 'lg'
	className?: string
}

function getInitials(name: string): string {
	return name
		.split(' ')
		.map((n) => n[0])
		.slice(0, 2)
		.join('')
		.toUpperCase()
}

function UserAvatar({ src, name, size = 'default', className }: UserAvatarProps) {
	return (
		<Avatar src={src} alt={name} size={size} fallback={name ? getInitials(name) : '?'} className={className} />
	)
}

export { UserAvatar, Avatar, AvatarImage, AvatarFallback }
