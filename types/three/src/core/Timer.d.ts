/**
 * This class is an alternative to {@link THREE.Clock} with a different API design and behavior
 * The goal is to avoid the conceptual flaws that became apparent in {@link THREE.Clock} over time.
 *
 * - {@link Timer} has an {@link .update()} method that updates its internal state. That makes it possible to call
 *   {@link .getDelta()} and {@link .getElapsed()} multiple times per simulation step without getting different values.
 * - The class can make use of the Page Visibility API to avoid large time delta values when the app is inactive (e.g.
 *   tab switched or browser hidden).
 *
 * @example
 * const timer = new Timer();
 *
 * function animate(timestamp) {
 *   requestAnimationFrame(animate);
 *   // timestamp is optional
 *   timer.update(timestamp);
 *   const delta = timer.getDelta();
 *   // do something with delta
 *   renderer.render(scene, camera);
 * }
 *
 * @see https://threejs.org/examples/#webgl_morphtargets_sphere
 */
declare class Timer {
    constructor();

    /**
     * Connects the timer to the given document. Calling this method is not mandatory to use the timer but enables the
     * usage of the Page Visibility API to avoid large time delta values.
     */
    connect(document: Document): void;

    /**
     * Disconnects the timer from the DOM and also disables the usage of the Page Visibility API.
     */
    disconnect(): void;

    /**
     * Returns the time delta in seconds.
     */
    getDelta(): number;

    /**
     * Returns the elapsed time in seconds.
     */
    getElapsed(): number;

    /**
     * Returns the time scale.
     */
    getTimescale(): number;

    /**
     * Sets a time scale that scales the time delta in {@link .update()}.
     */
    setTimescale(timescale: number): this;

    /**
     * Resets the time computation for the current simulation step.
     */
    reset(): this;

    /**
     * Can be used to free all internal resources. Usually called when the timer instance isn't required anymore.
     */
    dispose(): this;

    /**
     * Updates the internal state of the timer. This method should be called once per simulation step and before you
     * perform queries against the timer (e.g. via {@link getDelta()}).
     *
     * @param timestamp The current time in milliseconds. Can be obtained from the {@link https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame | requestAnimationFrame} callback argument. If not provided, the current time will be determined with {@link https://developer.mozilla.org/en-US/docs/Web/API/Performance/now | performance.now}.
     */
    update(timestamp?: number): this;
}

export { Timer };
