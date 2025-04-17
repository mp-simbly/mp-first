import { getDb } from "~/server/db";
import { desc } from "drizzle-orm";


export const dynamic = 'force-dynamic';

export default async function HomePage() {
    const db = getDb();
    const images = await db.query.images.findMany({
      orderBy: (model: typeof images, { desc }: { desc: (column: any) => any }) => [desc(model.id)],
    });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...images, ...images, ...images].map((image, index) => (
          <div key={image.id + "-" + index} className="w-48 flex-col">
            <img src={image.url} />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}