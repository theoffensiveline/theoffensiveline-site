import styled from 'styled-components';
import Chart from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';

export const NewsletterContainer = styled.div`
    max-width: 100%;
    margin: 0 auto;
    padding: 4px;
    font-family: 'Droid Serif', serif;
    font-size: 14px;
    color: #2E2E2E;
    background-color: #ECECDF;
`;

export const NewsletterTitle = styled.h1`
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    font-size: 80px;
    text-transform: uppercase;
    line-height: 72px;
    margin-bottom: 10px;
    max-width: 100%;
    text-align: center;

    @media (max-width: 600px) {
        font-size: 40px; /* Adjust the font size for small screens */
        line-height: 36px; /* Adjust the line height accordingly */
    }
`;

export const DateBar = styled.div`
    text-transform: uppercase;
    border-bottom: 2px solid #2E2E2E;
    border-top: 2px solid #2E2E2E;
    padding: 12px 0 12px 0;
    text-align: center;
`;


export const ArticleHeader = styled.h2`
    font-weight: 500;
    font-style: italic;
    font-size: 30px;
    box-sizing: border-box;
    padding: 10px 0 10px 0;
    text-align: center;
    line-height: normal;
    font-family: 'Droid Serif', serif;
    display: block;
    margin: 0 auto;
`;

export const ArticleSubheader = styled.div`
    font-weight: 700;
    font-size: 18px;
    box-sizing: border-box;
    padding: 10px 0 10px 0;
    text-align: center;
    line-height: normal;
    font-family: 'Droid Serif', serif;
    display: block;
    margin: 0 auto;

    &:before {
        border-top: 1px solid #2E2E2E;
        content: '';
        width: 100px;
        height: 7px;
        display: block;
        margin: 0 auto;
    }

    &:after {
        border-bottom: 1px solid #2E2E2E;
        content: '';
        width: 100px;
        height: 7px;
        display: block;
        margin: 0 auto;
    }
`;


export const StyledTable = styled.table`
    table-layout: auto;
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    th, td {
        border: 1px solid #000;
        padding: 10px; /* Add padding to th and td */
        text-align: left; /* Align text to the left */
    }

    th {
        color: #2E2E2E;
        background-color: #d6d6d6;
    }
`;

export const ArticleBlock = styled.div`
    padding: 4px;
    margin: 4px;
    max-width: calc(100% - 8px); /* Consider padding and margin within max-width */
    border: 1px solid #ccc;
`;

export const ImageWrapper = styled.div`
    max-width: 100%; // Limit the image width to its container
    overflow: hidden; // Hide any overflow if the image exceeds the container's width
`;

export const ArticleImage = styled.img`
    max-width: 100%; // Make the image responsive to its container's width
`;


const AwardsTable = ({ awardsData }) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Superlative</th>
                    <th>Winner + Description</th>
                </tr>
            </thead>
            <tbody>
                {awardsData.map((award, index) => (
                    <tr key={index}>
                        <td>{award.Superlative}</td>
                        <td>{award["Winner + Description"]}</td>
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    );
};

export default AwardsTable;



export const BarChart = ({ chartData }) => {
    const chartRef1 = useRef();

    useEffect(() => {
        // Get the canvas element
        const canvas = chartRef1.current;
        if (!canvas) return;

        // Extract data from chartData
        const teamNames = chartData.map(item => item.team_name);
        const maxPoints = chartData.map(item => item.max_points);
        const actualPoints = chartData.map(item => item.actual_points);

        // Create the new chart
        const myChart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: teamNames,
                datasets: [
                    {
                        label: 'Actual Points',
                        data: actualPoints,
                        backgroundColor: '#20A4F4',
                    },
                    {
                        label: 'Max Points',
                        data: maxPoints,
                        backgroundColor: '#7D8491',
                    },
                ],
            },
            options: {
                indexAxis: 'y',
                scales: {
                    y: {
                        type: 'category',
                        beginAtZero: true,
                        stacked: true,
                    },
                    x: {
                        type: 'linear',
                        beginAtZero: true,
                    },
                },
            },
        });

        // Cleanup the old chart before creating a new one
        return () => myChart.destroy();
    }, [chartData]);

    return (
        <div>
            <canvas ref={chartRef1}></canvas>
        </div>
    );
};



export const HistogramChart = ({ chartData }) => {
    const chartRef = useRef();
    let myChart = null;

    useEffect(() => {
        const canvas = chartRef.current;
        if (!canvas) return;

        if (myChart) {
            myChart.destroy();
        }

        const scores = chartData.map((item) => item.Score);
        const groups = chartData.map((item) => item.Group);

        const minScore = Math.floor(Math.min(...scores) / 5) * 5;
        const maxScore = Math.ceil(Math.max(...scores) / 5) * 5;
        const numBins = (maxScore - minScore) / 5 + 1;

        const binLabels = Array.from({ length: numBins }, (_, index) => (minScore + index * 5).toString());
        const binCountsThisWeek = new Array(numBins).fill(0);
        const binCountsHistoric = new Array(numBins).fill(0);

        scores.forEach((score, index) => {
            const binIndex = Math.floor((score - minScore) / 5);
            if (groups[index] === 'This Week') {
                binCountsThisWeek[binIndex]++;
            } else if (groups[index] === 'Historic') {
                binCountsHistoric[binIndex]++;
            }
        });

        const data = {
            labels: binLabels,
            datasets: [
                {
                    label: 'This Week',
                    data: binCountsThisWeek,
                    backgroundColor: '#20A4F4',
                },
                {
                    label: 'Historic',
                    data: binCountsHistoric,
                    backgroundColor: '#7D8491',
                },
            ],
        };

        const options = {
            scales: {
                x: {
                    type: 'linear',
                    ticks: {
                        stepSize: 15,
                    },
                },
                y: {
                    type: 'linear',
                    stacked: true,
                },
            },
        };

        myChart = new Chart(canvas, {
            type: 'bar',
            data: data,
            options: options,
        });
    }, [chartData]);

    return (
        <div>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};