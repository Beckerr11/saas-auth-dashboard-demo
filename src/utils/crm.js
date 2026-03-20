import { buildPublicQuotePdfUrl } from "../services/crmApi"

export const quoteStatusLabels = {
  sent: "Enviado",
  approved: "Aprovado",
  rejected: "Recusado",
}

export function getQuoteStatusLabel(status) {
  return quoteStatusLabels[status] || "Enviado"
}

export function getQuoteStatusIcon(status) {
  if (status === "approved") {
    return "approved"
  }

  if (status === "rejected") {
    return "rejected"
  }

  return "quote"
}

export function normalizeWhatsAppPhone(value) {
  return String(value || "").replace(/\D/g, "")
}

export function buildQuoteWhatsAppUrl(quote) {
  const phone = normalizeWhatsAppPhone(quote?.clientSnapshot?.phone)
  if (!phone || !quote?.publicToken) {
    return ""
  }

  const pdfUrl = buildPublicQuotePdfUrl(quote.publicToken)
  const message = `Olá! Segue o orçamento ${quote.quoteNumber || quote._id} em PDF: ${pdfUrl}`
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
