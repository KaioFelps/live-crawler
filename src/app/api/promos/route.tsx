import "dotenv/config"
import * as cheerio from "cheerio"
import { Article } from "@/core/entities/article"
import { ResponseData } from "@/core/types/response"
import { NextResponse } from "next/server"
import { ReactElement } from "react"
import { Badge } from "@/libs/BootstrapComponents"
import { Presenter } from "@/core/prototypes/presentable"

export async function GET(_req: Request): Promise<NextResponse<ResponseData<Article.Props[], ReactElement>>> {
  try {
    const ACTIVE_PROMOS_URL = "https://habblive.in/noticias/184"

    const response = await fetch(ACTIVE_PROMOS_URL)
    const buffer = Buffer.from(await response.arrayBuffer())

    const $ = cheerio.loadBuffer(buffer)
    
    const rawPromos = $("[style='margin: 0px; padding-bottom: 1em;']")
    const articles: Article[] = []

    rawPromos.each(function() {
      articles.push(Article.fromNode($(this)))
    })

    return NextResponse.json({
      success: true,
      data: articles.map(Presenter.map)
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json({
      success: false,
      error: <>
        Não foi possível buscar as promoções ativas. Tente novamente mais tarde.<br/><br/>
        <span className="text-2xl">#<Badge bg="danger">ForaAfter</Badge></span>
      </>
    })
  }
}

export const revalidate = 0