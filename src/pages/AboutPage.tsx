import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Container from "../components/Container";
import AboutPageTimeline from "./AboutPageTimeline";
import AboutPageTimelineDouble from "./AboutPageTimelineDouble";

const AboutPage = () => {
    return (
        <>
        <Breadcrumbs />
        <div style={{backgroundImage: `url("/src/images/comic-city-1920-2.jpg")`}}
            className="mt-0 max-w-[1920] h-[650px] bg-cover bg-center">
            <Container>
                {/* <div className="max-w-[1160px] w-full h-[] flex items-center justify-center bg-[#01042d]"> */}
                <div className="max-w-[1160px] w-full h-[] flex items-center justify-center mx-auto">
                    {/* <picture className="shrink-0">
                        <source />
                        <img src="/src/images/gekko-logo-800.png" className="aspect-square w-[400px] h-[400px] mx-auto mt-4 relative" alt="logo" />
                    </picture> */}
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
        {/* <Container> */}
            {/* <h2 className="font-bold text-5xl mt-28 mb-4">У ИСТОКОВ</h2>
            <p>Эта история началась, когда мы, Атос, Портос и Никитос, три наивных и гордых мушктетёра, после напряжённого рабочего дня за кружечкой пива в ирландском пабе "Моллис" в Ленинграде, на улице Рубинштейна, дом 36...</p>
            <p>
                Каждый из нас был бешеным фанатом рисованных историй... И каждый мечтал связать свою жизнь с ними. Кто-то мечтал стать художником, кто-то просто желал собрать вокруг себя общество единомышленников.
                Три мушкетёра, мечтавших нести культуру графических историй в массы. И вот этот день настал. Мы насобирали достаточно средств
                и решились открыть магазин в гараже галантерейщика Бонасье.                
            </p>
            <p>Уже на этом этапе начались трудности. Коня из гаража пришлось выгнать. Нет, это я не про Бонасье, этот конь остался в своей лавке и драл с нас по 50 экю в месяц за аренду гаража, так что первое время приходилось вести дела себе в убыток и работать в дополнительную смену.</p>
            <p>Спустя полгода дела худо-бедно стали налаживаться, мы уже почти начали выходить в плюс, как вдруг однажды ночью...</p> */}
            {/* <div className="flex gap-4 mt-8">
                <picture className="w-[738px]">
                    <source />
                    <img src="src/images/bang.png" alt="" className="w-[738px]"/>
                </picture>
                <div className="shrink">Гараж сгорел к чертям собачьим!
                Но трое мушкетёров не сдались. Нужно было искать деньги на новый гараж. И трое мушкетёров решились на отчаянный шаг: мы попросили кардинала дать денег на новый. Ришелье нахмурил брови, почесал репу и таки согласился дать 500 экю - с условием поставить нас на счётчик через месяц и отдать Рошфору, если процент не будет уплачен за неделю.
                И всё-таки кардинал согласился. Старик сразу смекнул, что со временем мы сможем наладить своё издательство и в комиксах высмеивать королеву и её проделки с Бэкингемом.
                </div>
            </div>
            <div className="flex items-start gap-4 mt-8">
                <picture>
                    <source />
                    <img src="src/images/city.png" alt="" className=""/>
                </picture>
                <p>sdfsdf sdfsdf sdfsdf sdfsdfsdfs  s</p>
            </div> */}
        {/* </Container> */}
        {/* <Container>
            <AboutPageTimeline/>
        </Container> */}
        <Container>
         <AboutPageTimelineDouble/>
        </Container>
        </>
        );
}
 
export default AboutPage;