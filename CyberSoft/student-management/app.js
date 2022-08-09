const express = require('express');
const app = express();
const port = 3000;

// chuyển req, resp về json để thao tác
app.use(express.json());

app.get("/", (req, resp) => {
    resp.send("Hello");
});

// lấy danh sách học sinh
app.get("/students", (req, resp) => {
    resp.send("lấy danh sách học sinh");
});

// lấy thông tin chi tiết học sinh
app.get("/students/:id", (req, resp) => {
    const params = req.params;
    console.log("params : ", params);
    resp.send("lấy thông tin chi tiết học sinh");
});

// thêm học sinh
app.post("/students", (req, resp) => {
    const student = req.body;
    console.log(student);
    resp.send("thêm học sinh");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});