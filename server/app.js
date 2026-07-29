const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const Router = require("./routers/userdataroutes");
const AdminRoute = require("./routers/routerAdmin");
const FeatureRoute = require("./routers/routerFeature");
const BlogRoute = require("./routers/routerBlog");
const TestimonialRoute = require("./routers/routerTestimonials");
const SitemapRoute = require("./routers/routerSitemap");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));

// Dynamic sitemap — must be before static file serving
app.use("/sitemap.xml", SitemapRoute);

app.use("/api", Router);
app.use("/auth/admin/api", AdminRoute);
app.use("/api/features", FeatureRoute);
app.use("/api/blogs", BlogRoute);
app.use("/api/testimonials", TestimonialRoute);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
