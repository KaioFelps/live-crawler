import { Presentable } from "../prototypes/presentable";
import type { Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";

export module Article {
    export type Props = {
        title: string;
        link: string;
        deadLine: string;
        gender: string;
        goal: string;
        cover: string;
        badge: string;
    }
}

export class Article implements Presentable<Article.Props> {
    public readonly title: string;
    public readonly link: string;
    public readonly deadLine: string;
    public readonly gender: string;
    public readonly goal: string;
    public readonly cover: string;
    public readonly badge: string;

    private constructor(values: Article.Props)
    {
       this.title = values.title;
       this.link = values.link;
       this.deadLine = values.deadLine;
       this.gender = values.gender;
       this.goal = values.goal;
       this.cover = values.cover;
       this.badge = values.badge;
    }

    public static fromNode(node: Cheerio<AnyNode>)
    {
        // To access Text Nodes we must get the 0 index from cheerio `find`
        // and access the Text node by using previous or nextSibling key.
        //
        // Then, we need to cast it to unknown and then cast it again to Text type
        // and access the text value by `Text.data` property.
        return new Article({
            title: node.find("a").text(),
            link: node.find("a").attr("href")!,
            deadLine: (node.find("b + br")[0].previousSibling as unknown as Text).data,
            gender: (node.find("br + b + br + b")[0].nextSibling as unknown as Text).data,
            goal: (node.find("br + b + br + b + br + b")[0].nextSibling as unknown as Text).data,
            cover: node.find("br").prev().attr("src")!,
            badge: node.find("br").prev().attr("src")!,
        })
    }

    __present(): Article.Props {
        return {
            title: this.title,
            link: this.link,
            deadLine: this.deadLine,
            gender: this.gender,
            goal: this.goal,
            cover: this.cover,
            badge: this.badge,
        };
    }
}
