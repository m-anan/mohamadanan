import { authOptions } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import httpProxyMiddleware from "next-http-proxy-middleware";

const ProxyHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  httpProxyMiddleware(req, res, {
    target: process.env.NEXT_PUBLIC_API_URL?.replace("/api", ""), // Remove /api from target
    pathRewrite: [
      {
        patternStr: "/api/proxy",
        replaceStr: "/api", // Add /api back in the rewrite
      },
    ],
    changeOrigin: true,
    onProxyInit: (proxy) => {
      /**
       * Check the list of bindable events in the `http-proxy` specification.
       * @see https://www.npmjs.com/package/http-proxy#listening-for-proxy-events
       */
      proxy.on("proxyReq", (proxyReq, req, _res) => {
        // Add Authorization header if session exists
        if (session?.accessToken) {
          proxyReq.setHeader("Authorization", `Bearer ${session.accessToken}`);
        }

        // Add headers to make it look like an API request
        proxyReq.setHeader("Accept", "application/json");
        proxyReq.setHeader("X-Requested-With", "XMLHttpRequest");

        // Remove any cookies to avoid CSRF issues
        proxyReq.removeHeader("cookie");

        console.log("Proxying request:", {
          method: req.method,
          url: req.url,
          target: proxyReq.path,
          hasAuth: !!session?.accessToken,
        });
      });

      proxy.on("proxyRes", (proxyRes, _req, _res) => {
        console.log("Proxy response:", {
          statusCode: proxyRes.statusCode,
          contentType: proxyRes.headers["content-type"],
        });
      });
    },
  });
};
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
export default ProxyHandler;
