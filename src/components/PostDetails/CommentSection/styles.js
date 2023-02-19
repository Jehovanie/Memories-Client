import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    commentsOuterContainer: {
        display: "flex",
        justifyContent: "space-between",

    },
    commentsInnerContainer: {
        height: "200px",
        overflow: "auto",
        marginRight: "30px"
    }
}))