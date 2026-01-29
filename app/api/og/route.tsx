import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'LinkedIn Lead Generation Tools';
    const description = searchParams.get('description') || 'Compare 80+ LinkedIn tools with honest reviews';
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0077B5',
            backgroundImage: 'linear-gradient(135deg, #0077B5 0%, #005885 100%)',
            fontSize: 32,
            fontWeight: 'bold',
            color: 'white',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'white',
                borderRadius: '12px',
                marginRight: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0077B5',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              LG
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              LinkedGen Directory
            </div>
          </div>
          
          <div
            style={{
              fontSize: '42px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '20px',
              maxWidth: '1000px',
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          
          <div
            style={{
              fontSize: '20px',
              textAlign: 'center',
              opacity: 0.9,
              maxWidth: '800px',
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
          
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              fontSize: '16px',
              opacity: 0.8,
            }}
          >
            linkedgen.directory
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}