import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Container from "../components/Container";
import AboutPageTimelineDouble from "./AboutPageTimelineDouble";

const AboutPage = () => {
    return (
        <>
        <Breadcrumbs />
        <div style={{backgroundImage: `url("/src/images/comic-city-1920-2.jpg")`}}
            className="mt-0 max-w-[1920] h-[650px] bg-cover bg-center">
            <Container>
                <div className="max-w-[1160px] w-full flex items-center justify-center mx-auto">
                    <div className="px-8 pt-8 w-full">
                        <h1 className="mx-auto text-4xl text-center font-bold text-white text-drop-shadow bg-[maroon] w-[75%] py-2">THE NOVEL TOWN</h1>
                        <p className="mx-auto text-xl text-center text-white text-drop-shadow bg-[maroon] mt-4 py-2 w-[85%]">
                            Ваше окно в мир рисованных историй!
                        </p>
                    </div>
                </div>
            </Container>
        </div>
        <div className="ml-4 font-bold ml-auto text-slate-100">designed by freepik</div>
        <Container>
         <AboutPageTimelineDouble/>
        </Container>
        </>
        );
}
 
export default AboutPage;