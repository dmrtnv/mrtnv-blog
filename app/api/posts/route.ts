import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const PostSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

export async function GET() {
  const posts: z.infer<typeof PostSchema>[] = [
    {
      title: 'Exploring the Wonders of Nature',
      body: 'Nature never ceases to amaze us with its beauty. From the towering mountains to the serene lakes, every aspect of nature holds a unique charm that captivates our senses. Exploring the wilderness teaches us valuable lessons about life and harmony. What is your favorite natural wonder?',
    },
    {
      title: 'The Art of Mindfulness',
      body: "In a fast-paced world, practicing mindfulness is crucial for our mental well-being. Taking a moment to breathe, observe, and appreciate the present can significantly impact our lives. Let's delve into the art of mindfulness and its positive effects on our daily routines.",
    },
    {
      title: 'Unraveling the Mysteries of Space',
      body: "The universe, with its vastness and mysteries, intrigues humanity. From distant galaxies to the enigmatic black holes, there's so much yet to discover. Let's embark on a journey to explore the cosmic wonders and expand our understanding of the universe.",
    },
  ];

  return NextResponse.json({ posts }, { status: 200 });
}

export async function POST(req: NextRequest) {
  let post = await req.json();

  try {
    post = PostSchema.parse(post);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 406 });
  }

  return NextResponse.json({ post }, { status: 201 });
}
