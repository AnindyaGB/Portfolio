import dynamic from "next/dynamic";
import 'bootstrap/dist/css/bootstrap.min.css';

const Map = dynamic(() => import('./Map'), {
    ssr: false
});

export default Map;