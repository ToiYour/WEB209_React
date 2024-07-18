import HomePageComponent from "./_component/HomePageComponent";
import { Button } from "antd";
const HomePage = () => {
    return (
        <>
            <Button type="primary">Hello</Button>
            <h1>Home page</h1>
            <HomePageComponent />
        </>
    );
};

export default HomePage;
