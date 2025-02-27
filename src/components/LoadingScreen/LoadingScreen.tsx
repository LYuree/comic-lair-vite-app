import { DNA } from "react-loader-spinner";

const LoadingScreen = () => {
    return ( 
        <div className="h-[60vh] flex justify-center items-center
            ">
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper absolute"
                />
        </div>
     );
}
 
export default LoadingScreen;