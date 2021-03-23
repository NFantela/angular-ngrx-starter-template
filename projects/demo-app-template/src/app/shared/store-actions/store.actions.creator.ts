/** Store all ngrx store actions strings here so we dont have doubles
 * e.g.  const someAction = createAction(ActionNamesSet.create('[Page] Actions Name'));
 */
class ActionNamesSet {
    private static names = new Set<string>();

    static create(name: string): string {
        if (ActionNamesSet.names.has(name)) {
            throw new Error('An Action with this type already exists!');
        }
        ActionNamesSet.names.add(name);
        return name;
    }
}

