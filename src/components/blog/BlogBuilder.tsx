import { ImgComponent, HeaderComponent, LinkComponent, HeaderAndContent, ListComponent, TagsShareComponent, SubHeaderComponent, ParagraphComponent, QuoteComponent, QuestionnaireComponent } from './builderComponents';



type QuestionnaireDataType = {
  question: string,
  answer: string | any
}


type BlogDataType = {
  id: string,
  content: {
      type?: string,
      datum?: string | string[] | QuestionnaireDataType[],
      title?: string,
  }[],
  details: {
      blogImg: string,
      authorImg: string,
      author: string,
      date: string,
  },
}

type BlogBuilderProps = {
    type: string,
    data: BlogDataType,
    className?: string,
    title?: string,
  };

  
const BlogBuilder = ({type, data, className, title}: BlogBuilderProps) => {

  switch (type) {
    case "image":
      return <ImgComponent src={data} alt={data} />;
    case "list":
      return <ListComponent data={data} />;
    case "questionnaire":
      return <QuestionnaireComponent data={data} />;
    case "headerAndContent":
      return <HeaderAndContent data={data}/>
    case "link":
      return <LinkComponent data={data} />;
    case "header":
      return <HeaderComponent data={data} />;
    case "subheader":
      return <SubHeaderComponent data={data} />;
    case "tagsshare":
      return <TagsShareComponent data={data} title={title!} />;
    case "quote":
      return <QuoteComponent data={data} />;
    case "paragraph":
      return <ParagraphComponent data={data} className={className!} />;
    default:
      return null;
  }
  };
  

export default BlogBuilder;