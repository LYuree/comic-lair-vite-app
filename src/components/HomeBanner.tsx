import banner1 from "/app/images/banner1.webp"

// import banner1 from "./nav/banner1.png"
import Container from "./Container";

const HomeBanner = () => {
    return (
    <div>
        <Container>
            <div className="mt-4">
                <a href="#">
                    <picture>
                        <source
                            type="image/webp"
                        />
                        <img src="/src/images/banner1.webp" alt="" />
                    </picture>
                    {/* <Image src={banner1}
                    width={1160}
                    height={475}
                    alt="Первые выпуски Grim Horse - бесплатно!"
                    /> */}
                </a>
            </div>
        </Container>
    </div> );
}
 
export default HomeBanner;