"use client";
import Collection from '@/components/Collection/Collection';
import Banner from "@/components/Banner/Banner";
import Subjects from "@/components/Subjects/Subjects";
import Courses from "@/components/Courses/Courses";

export default function Home() {
  return (
    <main>
      <Banner/>
      <Subjects/>
      <Courses/>
      <Collection/>
    </main>
  );
}
