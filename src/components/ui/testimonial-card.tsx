
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
}

export function TestimonialCard({ author, text, href }: TestimonialCardProps) {
  const card = (
    <Card className="w-[300px] p-6 bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_10px_40px_-15px_rgba(138,43,226,0.3)] group">
      <div className="flex items-center gap-4 mb-4">
        <Avatar>
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-white">{author.name}</span>
          <span className="text-sm text-white/60">{author.handle}</span>
        </div>
      </div>
      <p className="text-white/80 text-sm">{text}</p>
    </Card>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {card}
      </a>
    )
  }

  return card
}
