import Link from "next/link";

const mockURLs = [
  "https://5h6ewqp3d1.ufs.sh/f/7UfRj4xPm20WwTN5zP3tN1rKkRCsf6pOMLnYUAB5I9ybuZjX",
  "https://5h6ewqp3d1.ufs.sh/f/7UfRj4xPm20WsUlwL7CRlFUc05my3a249iWCuj8DAHxGNMbZ",
  "https://5h6ewqp3d1.ufs.sh/f/7UfRj4xPm20WagAPd13zdmRY7jUklMuTfcrq9woHh18P0bx6",
  "https://5h6ewqp3d1.ufs.sh/f/7UfRj4xPm20W5DEtXS0QFuwZRLV6GrOpAE4IaSqUeB3mkY7T",
  "https://5h6ewqp3d1.ufs.sh/f/7UfRj4xPm20Wp5WHjsNvqVFM1adJpTs8Q74lNnf3zIBcAiXZ",
  "https://5h6ewqp3d1.ufs.sh/f/7UfRj4xPm20W6un3voasrQymgZH3fCpXadWclD9YjFPtoKEq"
]

const mockImages = mockURLs.map((url, index) => ({
  id: index + 1,
  url,
}))

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
      Hello world
    </main>
  );
} 