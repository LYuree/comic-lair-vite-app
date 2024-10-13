import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Container from "../components/Container";

const AboutPage = () => {
    return (
        <>
        <Breadcrumbs />
        <Container>
            <div className="max-w-[1160px] w-full h-[] flex items-center justify-center gap-16 bg-[#01042d]">
                <picture className="shrink-0">
                    <source />
                    <img src="/src/images/gekko-logo-800.png" className="aspect-square w-[400px] h-[400px] mx-auto mt-4 relative" alt="logo" />
                </picture>
                <div>
                    <h1 className="text-6xl font-bold text-white">COMIC TRADEPOST</h1>
                    <p className="text-4xl text-white">Ваш выбор в мире рисованных историй!</p>
                </div>
            </div>
            <h2 className="font-bold text-5xl mt-8 mb-4">У ИСТОКОВ</h2>
            <p>Наша история началась, когда Lorem Ipsum после напряжённого рабочего дня встретил Dolor Sit Amet за кружечкой пива в ирландском пабе "Моллис" в Ленинграде, на улице Рубинштейна, дом 36...</p>
        </Container>
        </>
        );
}
 
export default AboutPage;