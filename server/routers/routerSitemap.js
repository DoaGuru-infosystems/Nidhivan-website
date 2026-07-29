const express = require("express");
const router = express.Router();
const { db } = require("../db");

const BASE_URL = "https://ayushiconstruction.com";

// Static pages with their SEO priorities
const STATIC_PAGES = [
  { url: "/",                              priority: "1.0", changefreq: "weekly"  },
  { url: "/about",                         priority: "0.8", changefreq: "monthly" },
  { url: "/gallery",                       priority: "0.8", changefreq: "weekly"  },
  { url: "/blogslist",                     priority: "0.7", changefreq: "weekly"  },
  { url: "/contact",                       priority: "0.7", changefreq: "monthly" },
  { url: "/ayushi-dhara-phase-IV",         priority: "0.95", changefreq: "weekly" },
  { url: "/ayushi-dhara-phase-III",        priority: "0.9", changefreq: "weekly"  },
  { url: "/ayushi-hari-vihar-phase-II",    priority: "0.9", changefreq: "weekly"  },
  { url: "/ayushi-awadh",                  priority: "0.9", changefreq: "weekly"  },
  { url: "/ayushi-lotus-view",             priority: "0.9", changefreq: "weekly"  },
  { url: "/ayushi-vrindavan",              priority: "0.9", changefreq: "weekly"  },
  { url: "/ayushi-home",                   priority: "0.9", changefreq: "weekly"  },
  { url: "/ayushi-dhara",                  priority: "0.8", changefreq: "monthly" },
  { url: "/ayushi-dhara-phase-I",          priority: "0.8", changefreq: "monthly" },
  { url: "/ayushi-dhara-phase-II",         priority: "0.8", changefreq: "monthly" },
  { url: "/ayushi-hari-vihar-phase-I",     priority: "0.8", changefreq: "monthly" },
  { url: "/ayushi-rudraksh-park",          priority: "0.75", changefreq: "monthly"},
  { url: "/ayushi-palm-green",             priority: "0.75", changefreq: "monthly"},
  { url: "/ayushi-villa",                  priority: "0.75", changefreq: "monthly"},
];

router.get("/", (req, res) => {
  db.query(
    "SELECT slug, updated_date FROM blogs WHERE is_published = 1 ORDER BY updated_date DESC",
    (err, blogs) => {
      if (err) {
        console.error("Sitemap DB error:", err);
        return res.status(500).send("Error generating sitemap");
      }

      const today = new Date().toISOString().split("T")[0];

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;

      // Static pages
      STATIC_PAGES.forEach((page) => {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += `  </url>\n`;
      });

      // Dynamic blog pages
      if (blogs.length > 0) {
        xml += `\n`;
        blogs.forEach((blog) => {
          // updated_date is stored as "YYYY-MM-DD HH:MM:SS" string
          const lastmod =
            blog.updated_date && blog.updated_date.length >= 10
              ? blog.updated_date.substring(0, 10)
              : today;
          xml += `  <url>\n`;
          xml += `    <loc>${BASE_URL}/blogslist/${blog.slug}</loc>\n`;
          xml += `    <lastmod>${lastmod}</lastmod>\n`;
          xml += `    <changefreq>monthly</changefreq>\n`;
          xml += `    <priority>0.6</priority>\n`;
          xml += `  </url>\n`;
        });
      }

      xml += `\n</urlset>`;

      res.header("Content-Type", "application/xml");
      res.header("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
      res.send(xml);
    }
  );
});

module.exports = router;
