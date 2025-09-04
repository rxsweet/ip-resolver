// Simple IP Resolver Worker - hanya menampilkan JSON seperti milik teman Anda

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

/**
 * Mendapatkan informasi IP dari request - format sama seperti ipresolver.json
 */
function getClientInfo(request) {
  const cf = request.cf || {};
  
  return {
    ip: request.headers.get("CF-Connecting-IP") || cf.ip || "Unknown",
    colo: cf.colo || "Unknown",
    clientTcpRtt: cf.clientTcpRtt || 0,
    requestHeaderNames: Object.fromEntries(request.headers.entries()),
    httpProtocol: cf.httpProtocol || "HTTP/1.1",
    tlsCipher: cf.tlsCipher || "",
    continent: cf.continent || "Unknown",
    asn: cf.asn || 0,
    clientAcceptEncoding: request.headers.get("Accept-Encoding") || "",
    verifiedBotCategory: cf.verifiedBotCategory || "",
    country: cf.country || "Unknown",
    region: cf.region || "Unknown",
    tlsClientCiphersSha1: cf.tlsClientCiphersSha1 || "",
    tlsClientAuth: cf.tlsClientAuth || {
      certIssuerDNLegacy: "",
      certIssuerSKI: "",
      certSubjectDNRFC2253: "",
      certSubjectDNLegacy: "",
      certFingerprintSHA256: "",
      certNotBefore: "",
      certSKI: "",
      certSerial: "",
      certIssuerDN: "",
      certVerified: "NONE",
      certNotAfter: "",
      certSubjectDN: "",
      certPresented: "0",
      certRevoked: "0",
      certIssuerSerial: "",
      certIssuerDNRFC2253: "",
      certFingerprintSHA1: ""
    },
    tlsClientRandom: cf.tlsClientRandom || "",
    tlsExportedAuthenticator: cf.tlsExportedAuthenticator || {
      clientFinished: "",
      clientHandshake: "",
      serverHandshake: "",
      serverFinished: ""
    },
    tlsClientHelloLength: cf.tlsClientHelloLength || "0",
    timezone: cf.timezone || "UTC",
    longitude: cf.longitude || "0",
    latitude: cf.latitude || "0",
    edgeRequestKeepAliveStatus: cf.edgeRequestKeepAliveStatus || 0,
    requestPriority: cf.requestPriority || "",
    postalCode: cf.postalCode || "",
    city: cf.city || "Unknown",
    tlsVersion: cf.tlsVersion || "",
    regionCode: cf.regionCode || "",
    asOrganization: cf.asOrganization || "Unknown",
    tlsClientExtensionsSha1Le: cf.tlsClientExtensionsSha1Le || "",
    tlsClientExtensionsSha1: cf.tlsClientExtensionsSha1 || ""
  };
}

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: CORS_HEADERS
      });
    }

    try {
      // Semua route mengembalikan informasi IP dalam format JSON
      const clientInfo = getClientInfo(request);
      
      return new Response(JSON.stringify(clientInfo, null, 2), {
        headers: {
          "Content-Type": "application/json",
          ...CORS_HEADERS
        }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        error: "Internal Server Error",
        message: error.message
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...CORS_HEADERS
        }
      });
    }
  }
};