import { buildApiUrl } from "../config"
import { apiFetch, deleteJson, patchJson, postJson, putJson } from "./platformApi"

function withQuery(path, params = {}) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value == null) {
      return
    }

    const normalized = String(value).trim()
    if (!normalized) {
      return
    }

    searchParams.set(key, normalized)
  })

  const query = searchParams.toString()
  return query ? `${path}?${query}` : path
}

export function getCrmSummary() {
  return apiFetch("/api/crm/summary")
}

export function listCrmClients(params = {}) {
  return apiFetch(withQuery("/api/crm/clients", params))
}

export function createCrmClient(payload) {
  return postJson("/api/crm/clients", payload)
}

export function updateCrmClient(clientId, payload) {
  return putJson(`/api/crm/clients/${clientId}`, payload)
}

export function deleteCrmClient(clientId) {
  return deleteJson(`/api/crm/clients/${clientId}`)
}

export function getCrmClientHistory(clientId) {
  return apiFetch(`/api/crm/clients/${clientId}/quotes`)
}

export function listCrmProducts(params = {}) {
  return apiFetch(withQuery("/api/crm/products", params))
}

export function createCrmProduct(payload) {
  return postJson("/api/crm/products", payload)
}

export function updateCrmProduct(productId, payload) {
  return putJson(`/api/crm/products/${productId}`, payload)
}

export function deleteCrmProduct(productId) {
  return deleteJson(`/api/crm/products/${productId}`)
}

export function listCrmQuotes(params = {}) {
  return apiFetch(withQuery("/api/crm/quotes", params))
}

export function getCrmQuote(quoteId) {
  return apiFetch(`/api/crm/quotes/${quoteId}`)
}

export function createCrmQuote(payload) {
  return postJson("/api/crm/quotes", payload)
}

export function updateCrmQuote(quoteId, payload) {
  return putJson(`/api/crm/quotes/${quoteId}`, payload)
}

export function updateCrmQuoteStatus(quoteId, status) {
  return patchJson(`/api/crm/quotes/${quoteId}/status`, { status })
}

export function getMyCrmQuotes() {
  return apiFetch("/api/crm/my-quotes")
}

export function buildCrmQuotePdfUrl(quoteId) {
  return buildApiUrl(`/api/crm/quotes/${quoteId}/pdf`)
}

export function buildPublicQuotePdfUrl(publicToken) {
  return buildApiUrl(`/public/quotes/${publicToken}/pdf`)
}
