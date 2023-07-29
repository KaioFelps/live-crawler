import "dotenv/config"
import { Table } from "@/libs/BootstrapComponents";
import { ArticleObject } from "./api/promos/route";

const url =  process.env.NODE_ENV === "production" ? "https://live-crawler.vercel.app" : "http://localhost:3000"

async function getActivePromotionsFromHabblive() {
  try {
    const request = await fetch(`${url}/api/promos`, {
      next: {
        revalidate: 0,
      }
    })
    
    const data = await request.json()

    return {
      status: request.status,
      data: data.data as ArticleObject[]
    }
  }
  catch(e) {
    console.log(e)

    return {
      status: 500,
      data: []
    }
  }
}

export default async function Home() {
  const promos: {status: number, data: Array<ArticleObject>} = await getActivePromotionsFromHabblive()

  return (
    <main>
      <h1>Habblive Promoções</h1>

      {promos.status === 500 ?
        <span>Erro</span>  
        :
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
            {promos.data.map((promo: ArticleObject) => (
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
      }
    </main>
  )
}
