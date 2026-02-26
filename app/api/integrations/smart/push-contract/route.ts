import { NextRequest, NextResponse } from 'next/server';
import { getItem, saveItem } from '@/lib/storage';
import { Offer, AuditLog } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const { offer_id, seller_authorization } = await req.json();

    const offer = await getItem<Offer>('offers', offer_id, 'offer_id');
    if (!offer) {
      return NextResponse.json({ success: false, error: 'Offer not found' }, { status: 404 });
    }

    // Update offer status
    offer.status = 'accepted';
    offer.updated_at = new Date().toISOString();
    await saveItem('offers', offer, 'offer_id');

    // Simulate Smart Push Contract
    const smartPayload = {
      transaction_source: 'offer_portal',
      property_id: offer.property_id,
      offer_id: offer.offer_id,
      accepted_version_id: offer.current_version_id,
      seller_id: 'sell_current_user',
      listing_agent_id: 'ag_susanne_h',
      buyer_names: offer.buyer_names,
      property_address: '2590 Onandaga Dr, Columbus, OH 43221',
      purchase_price: offer.offer_price,
      earnest_money: offer.earnest_money,
      earnest_money_holder: offer.earnest_money_holder,
      financing_type: offer.financing_type,
      loan_amount: offer.loan_amount,
      down_payment: offer.down_payment,
      closing_date: offer.closing_date,
      possession_terms: offer.possession_terms,
      contingencies: offer.contingencies,
      escalation: offer.escalation,
      documents: [], // In real app, fetch signed URLs
      purchase_contract_hash: 'sha256_mock_hash',
      acceptance_timestamp: new Date().toISOString(),
      seller_authorization
    };

    // Log the integration attempt
    const auditLog: AuditLog = {
      audit_id: 'AUD-' + Date.now(),
      actor_user_id: 'sell_current_user',
      action: 'smart.push_contract',
      entity_type: 'offer',
      entity_id: offer_id,
      metadata_json: { smartPayload },
      ip_address: req.headers.get('x-forwarded-for') || '127.0.0.1',
      created_at: new Date().toISOString(),
    };
    await saveItem('audit_logs', auditLog, 'audit_id');

    // Simulate success
    return NextResponse.json({ 
      success: true, 
      smart_space_id: 'SS-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      message: 'Contract pushed to Smart successfully' 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
