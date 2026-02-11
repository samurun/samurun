export const formatSeat = (seat: string) => {
    const [row, col] = seat.split('-');
    return `${col}${row}`;
};

interface BoeingSeatsMapOptions {
    selected: string[]
}

function makeSelectedRegions(selectedSeatNames: string[]) {
    return selectedSeatNames.map(name => ({
        name,
        selected: true,
        select: {
            label: {
                show: false,

            },
        },
        emphasis: {
            label: {
                show: false,
            }
        }
    }));
}

export function useBoeingSeatsMapOptions({ selected }: BoeingSeatsMapOptions) {


    return {
        fontFamily: 'Inter, sans-serif',
        tooltip: {
            show: true,
            formatter: (params: any) => {
                const seatN = params.name.split('-');
                return seatN[0];
            },
        },
        geo: {
            map: 'Boeing737900ERSeatsMap',
            roam: true,
            selectedMode: 'multiple',
            layoutCenter: ['50%', '50%'],
            layoutSize: '140%',
            label: {
                show: false,
            },
            tooltip: {
                formatter: (params: any) => {
                    return formatSeat(params.name);
                },
            },
            itemStyle: {
                color: undefined,
                borderWidth: 2,
            },
            emphasis: {
                itemStyle: {
                    borderColor: 'darkgreen',
                    color: 'green',
                    borderWidth: 2,
                },
                label: {
                    show: false,
                },
            },
            select: {
                itemStyle: {
                    color: 'green',
                    borderColor: 'darkgreen',
                    borderWidth: 2,
                },
                label: {
                    show: false,
                }
            },
            regions: makeSelectedRegions(selected)
        },
    };
}