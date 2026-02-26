import { NextRequest, NextResponse } from 'next/server';
import { saveItem, readData } from '@/lib/storage';
import { Offer, OfferVersion, AuditLog } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { property_id, ...offerData } = body;

    const offer_id = 'OFF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const version_id = 'VER-001';

    const newOffer: Offer = {
      offer_id,
      property_id,
      status: 'submitted',
      current_version_id: version_id,
      submitted_by_agent_id: 'ag_current_user', // Mock user
      buyer_names: offerData.buyer_names || [],
      offer_price: Number(offerData.offer_price),
      earnest_money: Number(offerData.earnest_money),
      earnest_money_holder: offerData.earnest_money_holder,
      financing_type: offerData.financing_type,
      loan_amount: offerData.loan_amount ? Number(offerData.loan_amount) : null,
      down_payment: offerData.down_payment ? Number(offerData.down_payment) : null,
      closing_date: offerData.closing_date,
      possession_terms: offerData.possession_terms,
      contingencies: offerData.contingencies,
      escalation: offerData.escalation,
      inclusions_exclusions: offerData.inclusions_exclusions,
      agent_notes: offerData.agent_notes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const newVersion: OfferVersion = {
      version_id,
      offer_id,
      version_number: 1,
      payload_json: newOffer,
      documents: [], // Handle documents separately or in body
      submitted_at: new Date().toISOString(),
    };

    const auditLog: AuditLog = {
      audit_id: 'AUD-' + Date.now(),
      actor_user_id: 'ag_current_user',
      action: 'offer.submitted',
      entity_type: 'offer',
      entity_id: offer_id,
      metadata_json: { version_id },
      ip_address: req.headers.get('x-forwarded-for') || '127.0.0.1',
      created_at: new Date().toISOString(),
    };

    await saveItem('offers', newOffer, 'offer_id');
    await saveItem('offer_versions', newVersion, 'version_id');
    await saveItem('audit_logs', auditLog, 'audit_id');

    return NextResponse.json({ 
      success: true, 
      offer_id,
      message: 'Offer submitted successfully' 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const property_id = searchParams.get('property_id');

  try {
    const offers = await readData<Offer>('offers');
    if (property_id) {
      return NextResponse.json(offers.filter(o => o.property_id === property_id));
    }
    return NextResponse.json(offers);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
