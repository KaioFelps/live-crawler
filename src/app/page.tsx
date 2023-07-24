import { Table } from "@/libs/BootstrapComponents";
import puppeteer from "puppeteer"

type ArticleObject = {
  title: string;
  link: string;
  deadLine: string;
  gender: string;
  goal: string;
  cover: string;
  badge: string;
}

export const revalidate = 0;

async function getActivePromotionsFromHabblive() {
  try {
    const browser = await puppeteer.launch({
      headless:false,
      args: ["--no-sandbox"]
    })
      const page = await browser.newPage()

      await page.goto("https://habblive.in/noticias/184", {
        waitUntil: "domcontentloaded"
      })

      await page.waitForSelector("[style='margin: 0px; padding-bottom: 1em;']")

      const promosObjects = await page.evaluate(() => {
        const promos = document.querySelectorAll("[style='margin: 0px; padding-bottom: 1em;']")

        const formattedPromos: Array<ArticleObject> = []
        
        promos.forEach((promo) => {
          const formattedPromo = {
            title: promo.querySelector("a")!.textContent!,
            link: promo.querySelector("a")!.href,
            deadLine: (promo.querySelector("b + br")!.previousSibling! as any).data,
            gender: (promo.querySelector("br + b + br + b")!.nextSibling! as any).data,
            goal: (promo.querySelector("br + b + br + b + br + b")!.nextSibling! as any).data,
            cover: (promo.querySelector("br")!.previousSibling! as HTMLImageElement).src,
            badge: (promo.querySelector("br")!.previousSibling!.previousSibling as HTMLImageElement)!.src,
          }

          formattedPromos.push(formattedPromo)
        })

        return formattedPromos
      })

    await browser.close()
    return promosObjects;   
  } catch (error) {
    console.log(error)

    return [];
  }  
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
