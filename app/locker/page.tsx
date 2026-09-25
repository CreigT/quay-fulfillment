import Link from "next/link";
import { listPacks } from "@/lib/packs";

export default function LockerPage() {
  const packs = listPacks();
  return (
    <>
      <h1>The locker</h1>
      <p className="lead">
        Four shelves. Three come from the store. One $9 add-on lives here.
      </p>
      {packs.map((pack) => (
        <div className="card" key={pack.id}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div>
              <h2 style={{ marginTop: 0 }}>{pack.name}</h2>
              <p>{pack.summary}</p>
              <p className="muted">{pack.preview}</p>
            </div>
            <div>
              <div className="price">${pack.price}</div>
              <Link className="btn" href={pack.id === "priority" ? "/priority" : "/unlock"}>
                {pack.id === "priority" ? "Add on" : "Unlock"}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
