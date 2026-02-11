export function useElectionSeatsMapOptions() {
    return {
        fontFamily: 'var(--font-sans)',
        tooltip: {
            trigger: 'item',
        },
        geo: {
            map: 'ElectionSeatsMap',
            roam: true,
            layoutCenter: ['50%', '50%'],
            layoutSize: '95%',
            itemStyle: {
                borderColor: '#d6d6d6',
            },
            tooltip: {
                trigger: 'item',
                margin: 0,
                backgroundColor: 'white',
                padding: 0,
                borderWidth: 0,
                shadowBlur: 0,
                extraCssText: 'box-shadow: none; border: none !important; padding: 0 !important;',
                formatter: (params: any) => {
                    const [province, electorate] = params.name.split('-');
                    const candidateName = 'นายสมชาย ใจดี';
                    const partyName = 'พรรคผ่อนคลาย';
                    const candidateNumber = '1';
                    const voteCount = '123,456';
                    const votePercentage = '40%';
                    const partyPhoto = '/shadow-candidate.webp';
                    const candidateAvatar = '/shadow-candidate.webp';

                    return `
                         <div class='flex flex-col overflow-hidden rounded-lg bg-card shadow-2xl border border-border min-w-[260px]'>
                            <!-- Header -->
                            <div class='flex items-center gap-2 px-3 border-b border-t-0 border-x-0 py-1.5'>
                                <span class='text-foreground font-semibold'>${province} เขต ${electorate}</span>
                            </div>
                            
                            <!-- Body -->
                            <div class='flex items-stretch justify-between'>
                                <!-- Number & Photo -->
                                <div class='relative w-20 h-20'>
                                    <!-- Skewed Background -->
                                    <div class='absolute bottom-0  right-4 w-24 h-20 -skew-x-8 bg-amber-500 shadow-inner'></div>
                                    
                                    <!-- Candidate Number -->
                                    <div
                                        class='absolute top-1 left-2 z-10 font-black text-3xl -skew-x-12 tracking-tighter'
                                        style='
                                            background: linear-gradient(#fff 40%, #e3e3e3 90%);
                                            -webkit-background-clip: text;
                                            background-clip: text;
                                            -webkit-text-fill-color: transparent;
                                            filter: drop-shadow(1px 1px 0px rgba(0,0,0,0.2));
                                        '
                                    >
                                    ${candidateNumber}
                                    </div>

                                    <div class='absolute bottom-2 right-0 z-20 bg-card shadow-2xl rounded-full'>
                                        <img 
                                            class='size-8'
                                            src='${partyPhoto}' 
                                            alt="party photo" 
                                        />
                                    </div>
                                    
                                    <!-- Avatar -->
                                    <img
                                        class=' contrast-100 absolute bottom-0 right-0 h-20 w-20 object-cover object-top scale-125'
                                        src='${candidateAvatar}'
                                        alt='candidate avatar'
                                    />
                                </div>
                                <!-- Content -->
                                <div class='flex flex-1 flex-col justify-center px-2 py-2 leading-tight'>
                                    <p class='font-bold text-lg text-foreground'>${candidateName}</p>
                                    <p class='text-xs text-muted-foreground'>${partyName} | เบอร์ ${candidateNumber}</p>
                                </div>  
                                <!-- Stats -->
                                <div class='flex flex-col justify-center bg-muted/10 px-3 py-2 text-end'>
                                    <p class='font-bold text-lg text-foreground'>${voteCount}</p>
                                    <p class='text-xs font-bold'>${votePercentage}</p>
                                </div>
                            </div>
                        </div>
                    `;
                },
            },
            emphasis: {
                label: {
                    show: false,
                },
            },
        },
    };
}