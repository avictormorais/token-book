/* eslint-disable react/prop-types */

function SvgComponent({ width, height, fill }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 512 512"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                id="TBK"
                fillRule="evenodd"
                d="M467.135 358.985V35.565S462.242 16 448.6 16H128.265s-82.4 6.7-82.4 82.4v315.18s1.8 83.43 83.43 83.43H448.6s17.51-4.12 17.51-17.51v-23.69s2.317-13.39-8.24-13.39v-66.95s9.265-.52 9.265-16.485M105.91 408.161c0-9.189 2.569-30.636 12.055-30.636h307.97v61.8H117.793s-11.883-3.011-11.883-31.164m94.751-242.713h-70.245a3.57 3.57 0 0 0-3.532 3.532v13.866a3.574 3.574 0 0 0 3.532 3.532h23.022v67.105a3.574 3.574 0 0 0 3.532 3.532h17.136a3.57 3.57 0 0 0 3.532-3.532v-67.105h23.023a3.576 3.576 0 0 0 3.532-3.532V168.98a3.574 3.574 0 0 0-3.532-3.532m18.839 91.567h44.868q15.566 0 22.892-8.11t7.325-20.276a27.5 27.5 0 0 0-2.093-11.315 19.6 19.6 0 0 0-7.063-8.045 20 20 0 0 0 5.036-6.082q2.288-3.989 2.289-10.531a29 29 0 0 0-3.074-13.277 24.04 24.04 0 0 0-10.007-10.007q-6.935-3.924-18.052-3.924H219.5a3.57 3.57 0 0 0-3.531 3.532v84.5a3.57 3.57 0 0 0 3.531 3.532Zm40.944-71.291a8.24 8.24 0 0 1 5.952 1.962 8.46 8.46 0 0 1 0 10.988 8.24 8.24 0 0 1-5.952 1.962h-20.279v-14.912h20.276Zm-20.276 51.015v-15.958h21.584a8.78 8.78 0 0 1 6.276 2.219 8.214 8.214 0 0 1 0 11.512 8.76 8.76 0 0 1-6.279 2.223h-21.584Zm145.2 15.959-34.533-43.429 32.31-39.5a2.884 2.884 0 0 0-2.486-4.317h-20.41a5.2 5.2 0 0 0-3.139.785 11.8 11.8 0 0 0-2.093 2.093l-23.023 28.255v-27.6a3.57 3.57 0 0 0-3.532-3.532h-17.136a3.574 3.574 0 0 0-3.532 3.532v84.5a3.574 3.574 0 0 0 3.532 3.532h17.136a3.57 3.57 0 0 0 3.532-3.532v-30.611l24.723 31.132a10.6 10.6 0 0 0 2.485 2.29 5.4 5.4 0 0 0 2.878.719h20.8a2.9 2.9 0 0 0 2.878-2.878 2.35 2.35 0 0 0-.393-1.439Z"
            ></path>
        </svg>
    )
}

export default SvgComponent