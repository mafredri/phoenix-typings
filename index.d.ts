/**
 * Objects that implement Identifiable can be identified and compared.
 */
interface Identifiable {
  hash(): number;
  isEqual(object: Object): boolean;
}


/**
 * Objects that implement Iterable can be traversed.
 */
interface Iterable<T> {
  /**
   * Returns the next object or the first object when on the last one.
   */
  next(): T;

  /**
   * Returns the previous object or the last object when on the first one.
   */
  previous(): T;
}


/**
 * A simple point object for 2D-coordinates.
 */
interface Point {
  x: number;
  y: number;
}


/**
 * A simple 2D-size object.
 */
interface Size {
  width: number;
  height: number;
}


/**
 * A 2D-rectangle representation of a Point and Size.
 */
interface Rectangle extends Point, Size {
}

interface Modal extends Identifiable {
  /**
   * Poperty for the origin for the modal, the enclosed properties are read-only
   * so you must pass an object for this property, by default (0, 0).
   */
  origin: Point;

  /**
   * Property for the duration (in seconds) for the modal, if the duration is
   * set to 0 the modal will remain open until closed, by default 0.
   */
  duration: number;

  /**
   * Property for the message for the modal, required for the modal to be
   * displayed.
   */
  message: string;

  /**
   * Returns the frame for the modal, the frame is adjusted for the current
   * message, therefor you must first set the message to get an accurate frame.
   */
  frame(): Rectangle;

  /**
   * Shows the modal.
   */
  show(): void;

  /**
   * Closes the modal.
   */
  close(): void;
}

interface ModalConstructor {
  new (): Modal;
  prototype: Modal;
}

/**
 * Use the Modal-object to display messages as modal windows.
 */
declare var Modal: ModalConstructor;

interface Screen extends Identifiable, Iterable<Screen> {
  /**
   * Returns the UUID for the screen.
   */
  identifier(): string;

  /**
   * Returns the whole frame for the screen.
   */
  frameInRectangle(): Rectangle;

  /**
   * Returns the visible frame for the screen subtracting the Dock and Menu from
   * the frame when visible.
   */
  visibleFrameInRectangle(): Rectangle;

  /**
   * Returns all spaces for the screen (OS X 10.11+, returns an empty list
   * otherwise).
   */
  spaces(): Space[]; // OS X 10.11+

  /**
   * Returns all windows for the screen if no optionals are given.
   */
  windows(optionals?: { visible?: boolean }): Window[];
}

interface ScreenObject {
  prototype: Screen;

  /**
   * Returns the screen containing the window with the keyboard focus.
   */
  main(): Screen;

  /**
   * Returns all screens, the first screen in this array corresponds to the
   * primary screen for the system.
   */
  all(): Screen[];
}

/**
 * Use the Screen-object to access frame sizes and other screens on a
 * multi-screen setup. Get the current screen for a window through the
 * Window-object. Beware that a screen can get stale if you keep a reference to
 * it and it is for instance disconnected while you do so.
 */
declare var Screen: ScreenObject;

interface Space extends Identifiable, Iterable<Space> {
  /**
   * Returns true if the space is a normal space.
   */
  isNormal(): boolean;

  /**
   * Returns true if the space is a full screen space.
   */
  isFullScreen(): boolean;

  /**
   * Returns the screen to which the space belongs to.
   */
  screen(): Screen;

  /**
   * Returns all windows for the space if no optionals are given.
   */
  windows(optionals? : { visible?: boolean }): Window[];

  /**
   * Adds the given windows to the space.
   */
  addWindows(windows: Window[]): void;

  /**
   * Removes the given windows from the space.
   */
  removeWindows(windows: Window[]): void;
}

interface SpaceObject {
  prototype: Space;

  /**
   * Returns the space containing the window with the keyboard focus (OS X
   * 10.11+, returns undefined otherwise).
   */
  active(): Space; // OS X 10.11+

  /**
   * Returns all spaces, the first space in this array corresponds to the
   * primary space (OS X 10.11+, returns an empty list otherwise).
   */
  all(): Space[]; // OS X 10.11+
}

/**
 * Use the Space-object to control spaces. These features are only supported on
 * El Capitan (10.11) and upwards. A single window can be in multiple spaces at
 * the same time. To move a window to a different space, remove it from any
 * existing spaces and add it to a new one. You can switch to a space by
 * focusing on a window in that space. Beware that a space can get stale if you
 * keep a reference to it and it is for instance closed while you do so.
 */
declare var Space: SpaceObject;


interface Mouse {
  /**
   * Returns the cursor position.
   */
  location(): Point;

  /**
   * Moves the cursor to a given position, returns true if successful.
   */
  moveTo(point: Point): boolean;
}

/**
 * Use the Mouse-object to control the cursor.
 */
declare var Mouse: Mouse;


interface App extends Identifiable {
  /**
   * Returns the process identifier (PID) for the app, returns -1 if the app
   * does not have a PID.
   */
  processIdentifier(): number;

  /**
   * Returns the bundle identifier for the app.
   */
  bundleIdentifier(): string;

  /**
   * Returns the name for the app.
   */
  name(): string;

  /**
   * Returns true if the app is currently frontmost.
   */
  isActive(): boolean;

  /**
   * Returns true if the app is hidden.
   */
  isHidden(): boolean;

  /**
   * Returns true if the app has been terminated.
   */
  isTerminated(): boolean;

  /**
   * Returns the main window for the app.
   */
  mainWindow(): Window;

  /**
   * Returns all windows for the app if no optionals are given.
   */
  windows(optionals?: { visible: boolean }): Window[];

  /**
   * Activates the app and brings its windows forward, returns true if
   * successful.
   */
  activate(): boolean;

  /**
   * Activates the app and brings its windows to focus, returns true if
   * successful.
   */
  focus(): boolean;

  /**
   * Shows the app, returns true if successful.
   */
  show(): boolean;

  /**
   * Hides the app, returns true if successful.
   */
  hide(): boolean;

  /**
   * Terminates the app, returns true if successful.
   */
  terminate(optionals?: { force?: boolean }): boolean;
}

interface AppObject {
  prototype: App;

  /**
   * Returns the running app with the given name, returns undefined if the app
   * is not currently running.
   */
  get(appName: string): App;

  /**
   * Launches to the background and returns the app with the given name, returns
   * undefined if unsuccessful.
   */
  launch(appName: string): App;

  /**
   * Returns the focused app.
   */
  focused(): App;

  /**
   * Returns all running apps.
   */
  all(): App[];
}

/**
 * Use the App-object to control apps. Beware that an app can get stale if you
 * keep a reference to it and it is for instance terminated while you do so, see
 * isTerminated().
 */
declare var App: AppObject;


interface Window extends Identifiable {
  /**
   * Returns all other windows on all screens if no optionals are given.
   */
  others(optionals?: { screen?: Screen }): Window[];

  /**
   * Returns the title for the window.
   */
  title(): string;

  /**
   * Returns true if the window is the main window for its app.
   */
  isMain(): boolean;

  /**
   * Returns true if the window is a normal window.
   */
  isNormal(): boolean;

  /**
   * Returns true if the window is a full screen window.
   */
  isFullScreen(): boolean;

  /**
   * Returns true if the window is minimised.
   */
  isMinimized(): boolean;

  /**
   * Returns true if the window is a normal and unminimised window that belongs
   * to an unhidden app.
   */
  isVisible(): boolean;

  /**
   * Returns the app for the window.
   */
  app(): App;

  /**
   * Returns the screen where most or all of the window is currently present.
   */
  screen(): Screen;

  /**
   * Returns the spaces where the window is currently present (OS X 10.11+,
   * returns an empty list otherwise).
   */
  spaces(): Space[]; // OS X 10.11+

  /**
   * Returns the top left point for the window.
   */
  topLeft(): Point;

  /**
   * Returns the size for the window.
   */
  size(): Size;

  /**
   * Returns the frame for the window.
   */
  frame(): Rectangle;

  /**
   * Sets the top left point for the window, returns true if successful.
   */
  setTopLeft(point: Point): boolean;

  /**
   * Sets the size for the window, returns true if successful.
   */
  setSize(size: Size): boolean;

  /**
   * Sets the frame for the window, returns true if successful.
   */
  setFrame(frame: Rectangle): boolean;

  /**
   * Sets whether the window is full screen, returns true if successful.
   */
  setFullScreen(value: boolean): boolean;

  /**
   * Resizes the window to fit the whole visible frame for the screen, returns
   * true if successful.
   */
  maximize(): boolean;

  /**
   * Minimises the window, returns true if successful.
   */
  minimize(): boolean;

  /**
   * Unminimises the window, returns true if successful.
   */
  unminimize(): boolean;

  /**
   * Returns windows to the direction of the window.
   */
  neighbors(direction: Phoenix.Direction): Window[];

  /**
   * Focuses the window, returns true if successful.
   */
  focus(): boolean;

  /**
   * Focuses the closest window to the direction of the window, returns `true`
   * if successful.
   */
  focusClosestNeighbor(direction: Phoenix.Direction): boolean;
}

interface WindowObject {
  prototype: Window;

  /**
   * Returns the focused window for the currently active app, can be undefined
   * if no window is focused currently.
   */
  focused(): Window;
  /**
   * Returns all windows in screens if no optionals are given.
   */
  all(optionals?: { visible?: boolean }): Window[];
  /**
   * Returns all visible windows in the order as they appear on the screen (from
   * front to back), essentially returning them in the most-recently-used order.
   */
  recent(): Window[];
}

/**
 * Use the Window-object to control windows. Every screen (i.e. display)
 * combines to form a large rectangle. Every window lives within this rectangle
 * and their position can be altered by giving coordinates inside this
 * rectangle.
 * To position a window to a specific display, you need to calculate its
 * position within the large rectangle. To figure out the coordinates for a
 * given screen, use the functions in Screen. Beware that a window can get stale
 * if you keep a reference to it and it is for instance closed while you do so.
 */
declare var Window: WindowObject;

interface Key extends Identifiable {
  /**
   * Read-only property for the key character in lower case or case sensitive
   * special key.
   */
  key: string;

  /**
   * Read-only property for the key modifiers in lower case.
   */
  modifiers: string[];

  /**
   * Returns true if the key handler is enabled, by default true.
   */
  isEnabled(): boolean;

  /**
   * Enables the key handler, any previous handler for the same key combination
   * will automatically be disabled, returns true if successful.
   */
  enable(): boolean;

  /**
   * Disables the key handler, returns true if successful.
   */
  disable(): boolean;
}

interface KeyConstructor {
  /**
   * Constructs and binds the key character with the specified modifiers (can be
   * an empty list) to a callback function and returns the handler (undefined if
   * not supported), you must keep a reference to the handler in order for your
   * callback to get called, you can have multiple handlers for a single key
   * combination, however only one can be enabled at a time, any previous
   * handler for the same key combination will automatically be disabled, the
   * callback function receives its handler as the only argument.
   */
  new (key: Phoenix.Key, modifiers: Phoenix.ModifierKey[], callback: (handler: Key) => void): Key;
  prototype: Key;

  /**
   * Constructs a managed handler for a key and returns the identifier for the
   * handler.
   */
  on(key: Phoenix.Key, modifiers: Phoenix.ModifierKey[], callback: (handler: Key) => void): number;
  /**
   * Disables the managed handler for a key with the given identifier.
   */
  off(identifier: number): void;
}

/**
 * Use the Key-object to enable or disable keys. You can have multiple handlers
 * for a single key combination, however only one can be enabled at a time. A
 * key is disabled automatically when you release your reference to the handler.
 * Keys are always reset on context reload. Enabling a key combination that has
 * been exclusively registered by another app will fail.
 */
declare var Key: KeyConstructor;

interface Event extends Identifiable {
  /**
   * Read-only property for the event name.
   */
  name: string;
}

interface EventConstructor {
  /**
   * Constructs and binds an event to a callback function and returns the
   * handler (undefined if not supported), you must keep a reference to the
   * handler in order for your callback to get called, you can have multiple
   * handlers for a single event, the callback function receives its handler as
   * the last argument, for any additional arguments see events
   */
  new (event: Phoenix.Event, callback: (target: App | Window | Event, handler: Event) => void): Event;
  prototype: Event;

  /**
   * Constructs a managed handler for an event and returns the identifier for
   * the handler.
   */
  on(event: Phoenix.Event, callback: (target: App | Window | Event, handler: Event) => void): number;
  /**
   * Disables the managed handler for an event with the given identifier.
   */
  off(identifier: number): void;
}

/**
 * Use the Event-object to access event properties. You can have multiple
 * handlers for a single event. To disable an event, release your reference to
 * the handler. Events are always reset on context reload.
 */
declare var Event: EventConstructor;

interface Timer extends Identifiable {
  /**
   * Stops the timer immediately.
   */
  stop(): void;
}

interface TimerConstructor {
  /**
   * Constructs a timer that fires the callback once or repeatedly until stopped
   * with the given interval (in seconds) and returns the handler, you must keep
   * a reference to the handler in order for your callback to get called, the
   * callback function receives its handler as the only argument.
   */
  new (interval: number, callback: (handler: Timer) => void): Timer;
  prototype: Timer;

  /**
   * Constructs a managed handler for a timer that fires only once and returns
   * the identifier for the handler.
   */
  after(interval: number, callback: (handler: Timer) => void): number;
  /**
   * Constructs a managed handler for a timer that fires repeatedly and returns
   * the identifier for the handler.
   */
  every(interval: number, callback: (handler: Timer) => void): number;
  /**
   * Disables the managed handler for a timer with the given identifier.
   */
  off(identifier: number): void;
}

declare var Timer: TimerConstructor;

interface Task extends Identifiable {
  /**
   * Read-only property for the termination status.
   */
  status: number;
  /**
   * Read-only property for the standard output.
   */
  output: string;
  /**
   * Read-only property for the standard error.
   */
  error: string;
}

interface TaskConstructor {
  /**
   * Constructs a task that asynchronously executes.
   */
  new (path: string, args: string[], callback?: (task: Task) => void): Task;
  prototype: Task;

  /**
   * Constructs a managed handler for a task and returns the identifier.
   */
  run(path: string, args: string[], callback?: (task: Task) => void): number;
  /**
   * Terminates the managed handler for a task with the given identifier.
   */
  terminate(identifier: number): void;
}

interface Storage {
  /**
   * Stores the value for the key, any previously set value with the same key
   * will be overridden.
   */
  set(key: string, value: any): void;

  /**
   * Retrieves and returns the value for the key (`undefined` if no value has
   * been set).
   */
  get(key: string): any;

  /**
   * Removes the key and the value associated with it.
   */
  remove(key: string): void;
}

declare var Storage: Storage;

/**
 * Use the Task-object to access task properties. To terminate a task, release
 * your reference to the handler. Tasks are always reset on context reload.
 * Beware that some task properties are only set after the task has completed.
 */
declare var Task: TaskConstructor;

interface Phoenix {
  /**
   * Manually reloads the context and any changes in the configuration files.
   */
  reload(): void;

  /**
   * Sets the preferences from the given key–value map, any previously set
   * preferences with the same key will be overridden.
   */
  set(preferences: Phoenix.Preferences): void;

  /**
   * Logs the message to the console.
   */
  log(message: any): void;

  /**
   * Delivers the message to the Notification Center.
   */
  notify(message: string): void;
}

/**
 * Use the Phoenix-object for API-level tasks.
 */
declare var Phoenix: Phoenix;

declare namespace Phoenix {
  interface Preferences {
    /**
     * If set true Phoenix will run completely in the background, this also
     * removes the status bar menu, defaults to false.
     */
    daemon?: boolean;
    /**
     * If set true Phoenix will automatically open at login, defaults to false.
     */
    openAtLogin?: boolean;
  }

  type Direction = 'west' | 'east' | 'north' | 'south';

  type Event = 'start' | 'screensDidChange' | 'spaceDidChange'
    | 'appDidLaunch' | 'appDidTerminate' | 'appDidActivate' | 'appDidHide'
    | 'appDidShow' | 'windowDidOpen' | 'windowDidClose' | 'windowDidFocus'
    | 'windowDidMove' | 'windowDidResize' | 'windowDidMinimize'
    | 'windowDidUnminimize';

  type ModifierKey = 'cmd' | 'alt' | 'ctrl' | 'shift';

  /**
   * A key can be any key on your local keyboard layout, for instance an
   * å-character if your keyboard has one.
   */
  type Key = string
    // Action keys
    | 'return' | 'tab' | 'space' | 'delete' | 'escape' | 'help' | 'home'
    | 'pageUp' | 'forwardDelete' | 'end' | 'pageDown' | 'left' | 'right'
    | 'down' | 'up'
    // Function keys
    | 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' | 'f9' | 'f10'
    | 'f11' | 'f12' | 'f13' | 'f14' | 'f15' | 'f16' | 'f17' | 'f18' | 'f19'
    // Keypad keys
    | 'keypad.' | 'keypad*' | 'keypad+' | 'keypadClear' | 'keypad/'
    | 'keypadEnter' | 'keypad-' | 'keypad=' | 'keypad0' | 'keypad1' | 'keypad2'
    | 'keypad3' | 'keypad4' | 'keypad5' | 'keypad6' | 'keypad7' | 'keypad8'
    | 'keypad9';
}
