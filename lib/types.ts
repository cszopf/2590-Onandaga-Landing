export type Property = {
  property_id: string;
  address: string;
  mls_number: string;
  listing_price: number;
  listing_agent_name: string;
  listing_agent_email: string;
  listing_brokerage: string;
  offer_deadline: string | null;
  media_urls: string[];
  created_at: string;
  updated_at: string;
};

export type OfferStatus = 
  | 'draft' 
  | 'submitted' 
  | 'under_review' 
  | 'needs_clarification' 
  | 'revision_requested' 
  | 'revised_submitted' 
  | 'countered' 
  | 'accepted' 
  | 'declined' 
  | 'expired' 
  | 'withdrawn';

export type Offer = {
  offer_id: string;
  property_id: string;
  status: OfferStatus;
  current_version_id: string;
  submitted_by_agent_id: string;
  buyer_names: string[];
  offer_price: number;
  earnest_money: number;
  earnest_money_holder: string;
  financing_type: string;
  loan_amount: number | null;
  down_payment: number | null;
  closing_date: string;
  possession_terms: string;
  contingencies: {
    inspection: boolean;
    inspection_days: number | null;
    appraisal: boolean;
    financing: boolean;
    other_text: string | null;
  };
  escalation: {
    enabled: boolean;
    cap_price: number | null;
    increment: number | null;
  };
  inclusions_exclusions: string;
  agent_notes: string;
  created_at: string;
  updated_at: string;
};

export type Document = {
  document_id: string;
  offer_id: string;
  version_id: string;
  type: 'contract' | 'addendum' | 'proof_of_funds' | 'pre_approval' | 'other';
  filename: string;
  storage_url: string;
  sha256_hash: string;
  uploaded_by_user_id: string;
  uploaded_at: string;
};

export type OfferVersion = {
  version_id: string;
  offer_id: string;
  version_number: number;
  payload_json: Offer;
  documents: Document[];
  submitted_at: string;
};

export type OfferScore = {
  offer_id: string;
  scored_by_user_id: string;
  criteria_scores: {
    price_strength: number;
    financing_certainty: number;
    contingency_risk: number;
    timeline_fit: number;
    earnest_money_strength: number;
    buyer_readiness_docs: number;
    other: number;
  };
  weights: {
    price_strength: number;
    financing_certainty: number;
    contingency_risk: number;
    timeline_fit: number;
    earnest_money_strength: number;
    buyer_readiness_docs: number;
    other: number;
  };
  computed_score: number;
  manual_override_score: number | null;
  notes: string;
  scored_at: string;
};

export type SellerDecision = {
  decision_id: string;
  offer_id: string;
  seller_user_id: string;
  decision: 'accept' | 'decline' | 'counter';
  decision_payload_json: any;
  authorization: {
    seller_verified: boolean;
    consents: {
      authorize_smart_transaction: boolean;
      confirm_accuracy: boolean;
      authorize_sharing: boolean;
    };
    esign: {
      typed_name: string;
      timestamp: string;
      ip_address: string;
    };
  };
  decided_at: string;
};

export type AuditLog = {
  audit_id: string;
  actor_user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata_json: any;
  ip_address: string;
  created_at: string;
};
