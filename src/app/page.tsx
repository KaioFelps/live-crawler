import { Table } from "@/libs/BootstrapComponents";
import { ArticleObject } from "./api/promos/route";
export const revalidate = 0;

const url = "https://live-crawler.vercel.app/"
// const url = "http://localhost:3000/"

async function getActivePromotionsFromHabblive() {
  const request = await fetch(url + "api/promos")
  const data = await request.json()

  return data.data as ArticleObject[]
}

export default async function Home() {
  const promos: Array<ArticleObject> = await getActivePromotionsFromHabblive()

  return (
    <main>
      <h1>Habblive Promoções</h1>

      <Table bordered hover striped>
        <thead>
          <tr>
            <th>Título</th>
            <th>Prazo</th>
            <th>Categoria</th>
            <th>Objetivo</th>
            <th>Emblema</th>
          </tr>
        </thead>

        <tbody>
          {promos.map((promo: ArticleObject) => (
            <tr key={promo.title.trim()}>
              <td><a href={promo.link}>{promo.title}</a></td>
              <td>{promo.deadLine}</td>
              <td>{promo.gender}</td>
              <td>{promo.goal}</td>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <td><img src={promo.badge} alt="" /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  )
}
