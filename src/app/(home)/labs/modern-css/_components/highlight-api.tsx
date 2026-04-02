'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';

export function HighlightAPI() {
  const [query, setQuery] = useState('');
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = contentRef.current; // อ้างอิงถึง element ที่เราต้องการไฮไลต์ข้อความภายในนั้น
    if (!container || !CSS.highlights) return;

    CSS.highlights.delete('search-result'); // ลบ Highlight เดิมก่อนที่จะสร้างใหม่ทุกครั้งที่ query เปลี่ยน เพื่อป้องกันการซ้อนทับของ Highlight เก่าและใหม่

    if (!query.trim()) return;

    const textNode = container.firstChild;
    const textContent = textNode?.textContent;
    if (!textNode || !textContent) return;

    const ranges: Range[] = [];
    let startPos = 0;
    const lowerText = textContent.toLowerCase();
    const lowerQuery = query.toLowerCase();

    // 2. ค้นหาตำแหน่งของ query ใน text content และสร้าง Range สำหรับแต่ละตำแหน่งที่เจอ
    while ((startPos = lowerText.indexOf(lowerQuery, startPos)) !== -1) {
      const range = new Range();
      range.setStart(textNode, startPos);
      range.setEnd(textNode, startPos + query.length);
      ranges.push(range);
      startPos += query.length;
    }

    // 3. สร้าง Highlight Object และลงทะเบียน
    if (ranges.length > 0) {
      const highlight = new Highlight(...ranges); // สร้าง Highlight Object จาก Range ที่หาเจอ

      console.log('Highlight Object:', highlight); // ตรวจสอบ Highlight Object ใน console ว่าถูกสร้างขึ้นอย่างถูกต้องหรือไม่
      CSS.highlights.set('search-result', highlight); // ลงทะเบียน Highlight Object กับชื่อ 'search-result' เพื่อให้ CSS สามารถเลือกใช้ได้
    }

    // Cleanup เมื่อ query เปลี่ยน หรือ unmount
    return () => {
      CSS.highlights.delete('search-result');
    };
  }, [query]); // <--- รันใหม่ทุกครั้งที่ query เปลี่ยน

  return (
    <div className='space-y-4 max-w-md'>
      <Input
        placeholder='Type something...'
        onChange={(e) => setQuery(e.target.value)}
      />
      <article>
        <p ref={contentRef}>
          Velit qui culpa enim duis aliquip aliqua do labore enim velit ea culpa
          reprehenderit. Reprehenderit cillum non magna sit cupidatat
          adipisicing commodo. Eu amet ex mollit elit cupidatat magna. Sint
          minim dolor esse ipsum consectetur non. Nostrud aliquip qui esse
          ullamco quis cupidatat eu dolore esse ea laborum. Sint mollit
          consequat enim est quis excepteur est deserunt. Eu do incididunt
          laborum enim officia anim proident dolore labore. Cillum tempor eu
          nisi mollit deserunt excepteur veniam quis aliqua aliquip. Adipisicing
          aute non ex ullamco. Dolore nostrud ullamco officia deserunt et veniam
          eiusmod. Sint sint laborum culpa nisi anim mollit excepteur dolore
          tempor pariatur ullamco dolore. Velit tempor adipisicing laborum quis
          eiusmod enim ex. Incididunt ut officia fugiat deserunt magna voluptate
          amet adipisicing ea. Lorem pariatur laboris nulla ex in ad veniam
          occaecat consectetur enim. Cupidatat eu aute esse anim laborum quis
          ullamco sunt.
        </p>
      </article>
      <style>
        {`::highlight(search-result) {
            background-color: #ffeb3b;
            color: black;
            text-decoration: underline;
        }`}
      </style>
    </div>
  );
}
