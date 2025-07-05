export const hikings = [
  {
    title: "อุทยานแห่งชาติภูกระดึง",
    hikes: [
      {
        startDate: "2023-12-25",
        endDate: "2023-12-27",
      },
      {
        startDate: "2024-12-28",
        endDate: "2024-12-30",
      },
    ],
    distance: 17.63,
  },
  {
    title: "เขาหลวง สุโขทัย",
    hikes: [{ startDate: "2024-9-8", endDate: "2024-9-9" }],
    distance: 3.89,
  },
  {
    title: "เปรโต๊ะลอซู",
    hikes: [{ startDate: "2024-10-12", endDate: "2024-10-14" }],
    distance: 7.83,
  },
  {
    title: "มุลาอิ รัฐเมียวดี พม่า ขุนเขาแห่งศรัทธา",
    hikes: [{ startDate: "2025-4-12", endDate: "2025-4-14" }],
    distance: 0.7,
  },
  {
    title: "ดอยพุ่ยโค - Doi Pui Co",
    hikes: [{ startDate: "2025-4-12", endDate: "2025-4-14" }],
    distance: 0.85,
  },
  {
    title: "เขาสันหนอกวัว | อุทยานแห่งชาติเขาแหลม กาญจนบุรี",
    hikes: [{ startDate: "2025-4-12", endDate: "2025-4-14" }],
    distance: 7.2,
  },
  {
    title: "เลอกวาเดาะ ขุนเขาทะเลหมอก",
    hikes: [{ startDate: "2025-4-12", endDate: "2025-4-14" }],
    distance: 2.58,
  },
  {
    title: "เขาเจ็ดยอดสุดทรหดแห่งแดนใต้",
    hikes: [{ startDate: "2025-4-12", endDate: "2025-4-14" }],
    distance: 23.24,
  },
  {
    title: "เขาเหมน",
    hikes: [{ startDate: "2025-5-17", endDate: "2025-5-18" }],
    distance: 3.7,
  },
  {
    title: "ดอยหลวงตาก",
    hikes: [{ startDate: "2025-6-28", endDate: "2025-6-29" }],
    distance: 9.84,
  },
];

export type HikingType = (typeof hikings)[0];
