import { Alert, Table } from "@/libs/BootstrapComponents";
import { Article } from "@/core/entities/article";
import { ReactElement } from "react";
import type { ResponseData } from "@/core/types/response"

async function getActivePromosFromHabblive(): Promise<ResponseData<Article.Props[], ReactElement>> {
  const base = process.env.SITE_URL!
  const request = await fetch(`${base}/api/promos`, {
    next: { revalidate: 0 }
  })

  return await request.json()
}

export default async function Home() {
  const promosResponse = await getActivePromosFromHabblive()

  return (
    <main className="w-[calc(100%_-_48px)] max-w-screen-2xl mx-auto">
      <h1 className="mt-20 mb-10 font-bold text-yellow-600">Habblive Promoções ✨</h1>

      {promosResponse.success ?
        <Table bordered hover striped>
          <thead>
            <tr>
              <th>Button (cover)</th>
              <th>Título</th>
              <th>Prazo</th>
              <th>Categoria</th>
              <th>Objetivo</th>
              <th>Emblema</th>
            </tr>
          </thead>

          <tbody>
            {promosResponse.data.map(promo => (
              <tr key={promo.title.trim()}>
                <td><img src={promo.cover} alt="" /></td>
                <td><a href={promo.link}>{promo.title}</a></td>
                <td>{promo.deadLine}</td>
                <td>{promo.gender}</td>
                <td>{promo.goal}</td>
                <td><img src={promo.badge} alt="" /></td>
              </tr>
            ))}
          </tbody>
        </Table>
        :
        <Alert variant="danger">{promosResponse.error}</Alert>
      }
    </main>
  )
}
