import { Link } from "react-router-dom";

const AboutPageTimelineDouble = () => {
    return ( 
        <>
        <div className="timeline">
            <div className="bound-layout">
                <div className="timeline-row">
                    <div className="image">
                        <img src="/src/images/friends_1_v2.jpg" alt="" />
                    </div>
                    <div className="content">
                        <h2 className="text-3xl font-bold mb-4 timeline-header">Всё началось с кучки мечтателей</h2>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </div>
                </div>
                <div className="timeline-row reverse">
                    <div className="image">
                        <img src="/src/images/girl_2.jpg" alt="" />
                    </div>
                    <div className="content">
                        <h2 className="text-3xl font-bold mb-4 timeline-header">Удачное знакомство</h2>
                        Helped us establish connections and find sponsorship...
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
                <h2 className="mx-auto w-[75%] text-3xl font-bold my-16 text-center bg-white timeline-header">И когда дела наконец пошли на лад...</h2>
                <img src="/src/images/bang.png" alt="" className="bg-white py-8 w-full h-full"/>
                <div className="timeline-row">
                    <div className="image">
                        <img src="/src/images/bonfire_3.jpg" alt="" />
                    </div>
                    <div className="content">
                        <h2 className="text-3xl font-bold timeline-header">Пожар</h2>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
                <div className="timeline-row reverse">
                    <div className="image">
                        <img src="/src/images/despair_4.jpg" alt="" />
                    </div>
                    <div className="content">
                        <h2 className="text-3xl font-bold timeline-header">Дед не раз говорил мне: "Никогда не сдавайся!"</h2>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
                <div className="timeline-row">
                    <div className="image">
                        <img src="/src/images/working_hard_5.jpg" alt="" />
                    </div>
                    <div className="content">
                        <h2 className="text-3xl font-bold timeline-header">Каждый работал за десятерых...</h2>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
                <h2 className="text-3xl font-bold my-16 text-center bg-white timeline-header">
                    <p>И наконец...</p>
                    <p>Мы снова вышли в плюс</p>
                </h2>

            </div>
        </div>
        <img src="/src/images/city.png" alt="" className="w-full h-full"/>
                <div className="text-center my-16 [&>*]:my-12">
                    <p>Наша цель - стать для вас надёжным поставщиком комиксов - как новых, так и давно вышедших из печати. Мы продаём то, что обожают читать и обсуждать люди в нашем сообществе. Мы усердно трудимся над тем, чтобы подарить вам эмоции, которые захочется испытвать снова и снова!</p>
                    <p className="text-4xl font-bold my-4">Мы - THE NOVEL TOWN</p>
                    <p className="text-3xl my-4">И мы обеспечим вам наилучшие впечатления от путешествия по бескрайнему миру рисованных историй</p>
                    <Link to="/signin" className="text-4xl font-bold text-[maroon] hover:text-[#e35b5b]">Чего же вы ждёте? ПРИСОЕДИНЯЙТЕСЬ!</Link>
                </div>
        </>
     );
}
 
export default AboutPageTimelineDouble;