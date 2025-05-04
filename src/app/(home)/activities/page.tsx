import dayjs from "dayjs";

import { hikings } from "@/data/hikings";
import { DATE_FORMAT } from "@/constants/format";

export default function Activities() {
  return (
    <main className="container max-w-4xl py-20">
      <h1 className="text-4xl font-bold mb-8">Hikings</h1>
      <div>
        {hikings.map((hiking) => (
          <div key={hiking.title} className="mb-4">
            <h2 className="text-xl font-semibold">
              {hiking.title}{" "}
              {hiking.hikes.length > 1 && (
                <span className="text-md">({hiking.hikes.length}X)</span>
              )}
            </h2>
            <div className="text-sm text-muted-foreground">
              <time dateTime={hiking.hikes[0].startDate}>
                <span className="px-0.5">
                  {dayjs(hiking.hikes[0].startDate).format(DATE_FORMAT)}
                </span>
              </time>
              <span className="px-1">·</span>
              <span>{hiking.distance} km</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
