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
                        <h2 className="text-3xl font-bold mb-4 timeline-header">Everything started with a group of dreamers...</h2>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </div>
                </div>
                <div className="timeline-row reverse">
                    <div className="image">
                        <img src="/src/images/girl_2.jpg" alt="" />
                    </div>
                    <div className="content">
                        <h2 className="text-3xl font-bold mb-4 timeline-header">A Happy Acquaintance</h2>
                        Helped us establish connections and find sponsorship...
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
                <h2 className="mx-auto w-[75%] text-3xl font-bold my-16 text-center bg-white timeline-header">And When The Things Were Finally Starting To Look Good...</h2>
                <img src="/src/images/bang.png" alt="" className="bg-white py-8 w-full h-full"/>
                <div className="timeline-row">
                    <div className="image">
                        <img src="/src/images/bonfire_3.jpg" alt="" />
                    </div>
                    <div className="content">
                        <h2 className="text-3xl font-bold timeline-header">A Bonfire In The Shop</h2>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
                <div className="timeline-row reverse">
                    <div className="image">
                        <img src="/src/images/despair_4.jpg" alt="" />
                    </div>
                    <div className="content">
                        <h2 className="text-3xl font-bold timeline-header">We Were Always Told To nEvA gIvE uPpP!11!!!</h2>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
                <div className="timeline-row">
                    <div className="image">
                        <img src="/src/images/working_hard_5.jpg" alt="" />
                    </div>
                    <div className="content">
                        <h2 className="text-3xl font-bold timeline-header">So We Worked Seven Times As Hard As Before...</h2>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
                <h2 className="text-3xl font-bold my-16 text-center bg-white timeline-header">
                    <p>And At Last...</p>
                    <p>We went profitable again!</p>
                </h2>

            </div>
        </div>
        <img src="/src/images/city.png" alt="" className="w-full h-full"/>
                <div className="text-center my-16 [&>*]:my-12">
                    <p>Our concept is to be your trusted independent seller of back issue comics and classic role playing games. In the long term our ambition is to also sell retro gaming and vinyl.
                    We will sell the stuff that our community enjoys reading and playing, and discuss why we thought it was cool! Our promise to you, is to work especially hard to give you a great experience, that you want to repeat again and again!</p>
                    <p className="text-4xl font-bold my-4">We are THE NOVEL TOWN</p>
                    <p className="text-3xl my-4">And we seek to provide you with the best experiences in the vast world of drawn stories.</p>
                    <a className="text-4xl font-bold text-[maroon] hover:text-[#e35b5b]" href="#">So, come in and JOIN US!</a>
                </div>
        </>
     );
}
 
export default AboutPageTimelineDouble;