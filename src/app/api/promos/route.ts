import { NextResponse } from "next/server"
import puppeteer from "puppeteer"

export type ArticleObject = {
    title: string;
    link: string;
    deadLine: string;
    gender: string;
    goal: string;
    cover: string;
    badge: string;
  }

export async function GET(req: Request) {
    try {
        const browser = await puppeteer.launch({
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

        return NextResponse.json({data: promosObjects})
      } catch (error) {
        console.log(error)
    
        return NextResponse.json({data: []});
      }  
}

export const revalidate = 60