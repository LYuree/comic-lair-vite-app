import { DNA } from "react-loader-spinner";

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const LoadingScreen = () => {
    return ( 
        <div className="h-[60vh] flex justify-center items-center">
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
                />
        </div>
     );
}
 
export default LoadingScreen;