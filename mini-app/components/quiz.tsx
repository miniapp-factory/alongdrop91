"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

export default function Quiz() {
  type Question = {
    text: string;
    options: { text: string; animal: string }[];
  };

  const questions: Question[] = [
    {
      text: "What’s your favorite way to spend a weekend?",
      options: [
        { text: "Reading a book in a cozy corner", animal: "cat" },
        { text: "Playing fetch with friends", animal: "dog" },
        { text: "Exploring a new trail", animal: "fox" },
        { text: "Nibbling on snacks while watching TV", animal: "hamster" },
        { text: "Riding a bike or horse", animal: "horse" },
      ],
    },
    {
      text: "Which of these describes your personality best?",
      options: [
        { text: "Independent and curious", animal: "cat" },
        { text: "Loyal and friendly", animal: "dog" },
        { text: "Clever and adventurous", animal: "fox" },
        { text: "Energetic and playful", animal: "hamster" },
        { text: "Graceful and calm", animal: "horse" },
      ],
    },
    {
      text: "What’s your ideal vacation?",
      options: [
        { text: "A quiet cabin in the woods", animal: "cat" },
        { text: "A beach with lots of people", animal: "dog" },
        { text: "A safari in the wild", animal: "fox" },
        { text: "A city with many cafes", animal: "hamster" },
        { text: "A horse ranch", animal: "horse" },
      ],
    },
    {
      text: "How do you handle stress?",
      options: [
        { text: "Take a nap or relax", animal: "cat" },
        { text: "Go for a walk or run", animal: "dog" },
        { text: "Find a clever solution", animal: "fox" },
        { text: "Chew on something", animal: "hamster" },
        { text: "Take a deep breath and stay calm", animal: "horse" },
      ],
    },
    {
      text: "What’s your favorite snack?",
      options: [
        { text: "Fish or tuna", animal: "cat" },
        { text: "Bones or kibble", animal: "dog" },
        { text: "Fresh berries", animal: "fox" },
        { text: "Seeds or nuts", animal: "hamster" },
        { text: "Carrots or apples", animal: "horse" },
      ],
    },
  ];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const shuffle = (arr: any[]) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const shuffledOptions = useMemo(
    () => shuffle(questions[current].options),
    [current]
  );

  const handleSelect = (animal: string) => {
    setAnswers([...answers, animal]);
    setCurrent(current + 1);
  };

  const getResult = () => {
    const score: Record<string, number> = {
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    };
    answers.forEach((a) => {
      score[a] = (score[a] ?? 0) + 1;
    });
    const max = Math.max(...Object.values(score));
    const best = Object.entries(score).find(([, v]) => v === max)?.[0] ?? "cat";
    return best;
  };

  if (current < questions.length) {
    const q = questions[current];
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">{q.text}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {shuffledOptions.map((opt, idx) => (
            <Button
              key={idx}
              variant="outline"
              onClick={() => handleSelect(opt.animal)}
            >
              {opt.text}
            </Button>
          ))}
        </CardContent>
      </Card>
    );
  }

  const result = getResult();
  const imageSrc = `/${result}.png`;
  const animalNames: Record<string, string> = {
    cat: "Cat",
    dog: "Dog",
    fox: "Fox",
    hamster: "Hamster",
    horse: "Horse",
  };

  return (
    <Card className="w-full max-w-md mx-auto text-center">
      <CardHeader>
        <CardTitle className="text-2xl">
          You’re most like a {animalNames[result]}!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={imageSrc}
          alt={animalNames[result]}
          width={512}
          height={512}
          className="mx-auto"
        />
        <div className="mt-4 flex flex-col gap-2">
          <Share text={`I’m a ${animalNames[result]}! ${url}`} />
          <Button onClick={() => { setCurrent(0); setAnswers([]); }}>
            Retake Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
